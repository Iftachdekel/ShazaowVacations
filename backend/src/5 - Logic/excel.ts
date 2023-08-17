import { executeSql } from "../2 - Utils/dal";
import fs from 'fs'

export const downloadSummeryToCSV = async () => {
    try {
      const query = `
      SELECT vacations.destination, COUNT(uservacations.userId) as COUNT FROM vacations 
      LEFT JOIN uservacations ON vacations.id = uservacations.vacationid 
      WHERE vacations.id = vacations.id GROUP BY vacations.destination
      `;
      const getData = await executeSql(query);
      const csvContent = getData
        .map((row: { destination: string; COUNT: number }) => `${row.destination},${row.COUNT}`)
        .join('\n');
      const filePath = 'data.csv';
      fs.writeFileSync(filePath, csvContent);
      return csvContent
    } catch (error) {
      console.error('Error occurred while downloading data:', error);
    }
  };

