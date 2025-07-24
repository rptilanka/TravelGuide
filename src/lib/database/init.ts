import { GuideDB, ReviewDB, DatabaseUtils } from './index';
import { sampleGuides, sampleReviews } from '../../data/sampleData';

// Initialize database with sample data
export const initializeDatabase = async () => {
  console.log('Initializing database...');
  
  try {
    // Clear existing data
    DatabaseUtils.clearDatabase();
    
    // Create sample guides
    const createdGuides = [];
    for (const guideData of sampleGuides) {
      const result = await GuideDB.createGuide(guideData);
      if (result.success && result.data) {
        createdGuides.push(result.data);
        console.log(`Created guide: ${result.data.name}`);
      } else {
        console.error(`Failed to create guide: ${result.error}`);
      }
    }
    
    // Create sample reviews for the first few guides
    for (let i = 0; i < Math.min(sampleReviews.length, createdGuides.length); i++) {
      const reviewData = {
        ...sampleReviews[i],
        guideId: createdGuides[i].id
      };
      
      const result = await ReviewDB.createReview(reviewData);
      if (result.success) {
        console.log(`Created review for ${createdGuides[i].name}`);
      } else {
        console.error(`Failed to create review: ${result.error}`);
      }
    }
    
    const stats = DatabaseUtils.getStats();
    console.log('Database initialized successfully:', stats);
    
    return {
      success: true,
      stats
    };
  } catch (error) {
    console.error('Failed to initialize database:', error);
    return {
      success: false,
      error: error
    };
  }
};

// Check if database needs initialization
export const checkDatabaseStatus = () => {
  const stats = DatabaseUtils.getStats();
  const needsInit = stats.totalGuides === 0;
  
  return {
    needsInitialization: needsInit,
    stats
  };
};
