import { GuideDB, ReviewDB, DatabaseUtils } from './index';
import { sampleGuides, sampleReviews } from '../../data/sampleData';

// Add sample guides without clearing existing user guides
export const addSampleGuidesIfNeeded = async () => {
  console.log('Checking if sample guides need to be added...');
  
  try {
    const existingStats = DatabaseUtils.getStats();
    
    // If we have very few guides, add sample guides to supplement
    if (existingStats.totalGuides < 10) {
      console.log('Adding sample guides to supplement existing guides...');
      
      // Create sample guides (they will be skipped if email already exists)
      const createdGuides = [];
      for (const guideData of sampleGuides) {
        const result = await GuideDB.createGuide(guideData);
        if (result.success && result.data) {
          createdGuides.push(result.data);
          console.log(`Added sample guide: ${result.data.name}`);
        } else if (result.error?.includes('already exists')) {
          console.log(`Guide ${guideData.name} already exists, skipping...`);
        } else {
          console.error(`Failed to create guide: ${result.error}`);
        }
      }
      
      // Add some sample reviews
      const allGuides = await GuideDB.getAllGuides();
      if (allGuides.success && allGuides.data) {
        for (let i = 0; i < Math.min(sampleReviews.length, allGuides.data.length); i++) {
          const reviewData = {
            ...sampleReviews[i],
            guideId: allGuides.data[i].id
          };
          
          const result = await ReviewDB.createReview(reviewData);
          if (result.success) {
            console.log(`Added review for ${allGuides.data[i].name}`);
          }
        }
      }
      
      const newStats = DatabaseUtils.getStats();
      console.log('Sample guides added successfully:', newStats);
      
      return {
        success: true,
        stats: newStats,
        message: `Added sample guides to supplement existing ${existingStats.totalGuides} guides`
      };
    } else {
      console.log('Sufficient guides already exist, no sample data needed');
      return {
        success: true,
        stats: existingStats,
        message: 'Sufficient guides already exist'
      };
    }
  } catch (error) {
    console.error('Failed to add sample guides:', error);
    return {
      success: false,
      error: error
    };
  }
};

// Initialize database with sample data
export const initializeDatabase = async () => {
  console.log('Initializing database...');
  
  try {
    // Check if we already have guides - don't clear if we do!
    const existingStats = DatabaseUtils.getStats();
    if (existingStats.totalGuides > 0) {
      console.log('Database already has guides, using addSampleGuidesIfNeeded instead');
      return await addSampleGuidesIfNeeded();
    }
    
    // Only clear and initialize if database is truly empty
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
  
  // Only initialize if there are no guides AND no sample data has been loaded
  // This prevents clearing user-created guides
  const hasDefaultGuides = stats.totalGuides >= 23; // We have 53 sample guides
  const hasAnyGuides = stats.totalGuides > 0;
  
  return {
    needsInitialization: !hasAnyGuides && !hasDefaultGuides,
    hasUserGuides: hasAnyGuides && !hasDefaultGuides,
    stats
  };
};
