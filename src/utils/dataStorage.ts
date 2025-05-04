// Utility functions for managing persistent data storage

/**
 * Checks if localStorage data exists and is valid
 * @param key The localStorage key to check
 * @param sampleData Sample data to use if needed
 * @returns Boolean indicating if data is valid
 */
export const validateStorageData = <T>(key: string, sampleData: T[]): boolean => {
  try {
    const data = localStorage.getItem(key);
    if (!data) return false;
    
    const parsedData = JSON.parse(data);
    return Array.isArray(parsedData) && parsedData.length > 0;
  } catch (error) {
    console.error(`Error validating ${key} data:`, error);
    return false;
  }
};

/**
 * Restores data from backup if main data is missing
 * @param key The localStorage key to restore
 * @param sampleData Sample data to use if backup isn't available
 */
export const restoreDataFromBackup = <T>(key: string, sampleData: T[]): void => {
  try {
    // Look for the most recent backup
    const backupKeys = Object.keys(localStorage)
      .filter(k => k.startsWith(`${key}_backup_`))
      .sort()
      .reverse();
    
    if (backupKeys.length > 0) {
      const latestBackup = localStorage.getItem(backupKeys[0]);
      if (latestBackup) {
        localStorage.setItem(key, latestBackup);
        console.log(`Restored ${key} from backup ${backupKeys[0]}`);
        return;
      }
    }
    
    // No backup found, use sample data
    localStorage.setItem(key, JSON.stringify(sampleData));
    console.log(`No backup found for ${key}, using sample data`);
  } catch (error) {
    console.error(`Error restoring ${key} data:`, error);
    localStorage.setItem(key, JSON.stringify(sampleData));
  }
};

/**
 * Sets up data integrity maintenance
 * Periodically checks if data exists and restores it if missing
 */
export const setupDataIntegrityCheck = (): (() => void) => {
  // Check data integrity every hour
  const interval = setInterval(() => {
    const newsData = localStorage.getItem("adminNewsData");
    const videoData = localStorage.getItem("videoNewsData");
    
    if (!newsData) {
      console.log("News data missing, attempting to restore from backup");
      restoreDataFromBackup("adminNewsData", []);
      // Dispatch event to notify components
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('newsUpdated'));
    }
    
    if (!videoData) {
      console.log("Video data missing, attempting to restore from backup");
      restoreDataFromBackup("videoNewsData", []);
      // Dispatch event to notify components
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('videoNewsUpdated'));
    }
  }, 3600000); // 1 hour
  
  // Return cleanup function
  return () => clearInterval(interval);
};

/**
 * Creates a backup of data
 * @param key The localStorage key to backup
 */
export const backupData = (key: string): void => {
  try {
    const data = localStorage.getItem(key);
    if (data) {
      const backupKey = `${key}_backup_${new Date().toISOString().split('T')[0]}`;
      localStorage.setItem(backupKey, data);
      
      // Limit the number of backups to keep (keep last 7 days)
      const backupKeys = Object.keys(localStorage)
        .filter(k => k.startsWith(`${key}_backup_`))
        .sort();
      
      if (backupKeys.length > 7) {
        // Remove oldest backups
        backupKeys.slice(0, backupKeys.length - 7).forEach(oldKey => {
          localStorage.removeItem(oldKey);
        });
      }
    }
  } catch (error) {
    console.error(`Error backing up ${key} data:`, error);
  }
};
