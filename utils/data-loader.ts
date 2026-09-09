import fs from 'node:fs';
import path from 'node:path';
import type { Dataset, FlightSearchData, IntegrationData, ResultData, ResultMutation, ResultRefinementData, ValidationSecurityData } from '../types/flight-data';

const dataDirectory = path.resolve(process.cwd(), 'test-data');
function loadDatasets<T>(fileName: string): Dataset<T>[] { return JSON.parse(fs.readFileSync(path.join(dataDirectory, fileName), 'utf8')) as Dataset<T>[]; }
function findDataset<T>(fileName: string, datasetId: string): Dataset<T> {
  const dataset = loadDatasets<T>(fileName).find((item) => item.datasetId === datasetId);
  if (!dataset) throw new Error(`Dataset ${datasetId} was not found in ${fileName}`);
  return dataset;
}
export const flightData = {
  search(datasetId: string): Dataset<FlightSearchData> { return findDataset<FlightSearchData>('flight-search-data.json', datasetId); },
  validation(datasetId: string): Dataset<ValidationSecurityData> { return findDataset<ValidationSecurityData>('flight-validation-security-data.json', datasetId); },
  result(datasetId: string): Dataset<ResultData | ResultRefinementData> { return findDataset<ResultData | ResultRefinementData>('flight-results-data.json', datasetId); },
  mutations(datasetId: string): Dataset<ResultMutation[]> { return findDataset<ResultMutation[]>('flight-validation-security-data.json', datasetId); },
  integration(datasetId: string): Dataset<IntegrationData> { return findDataset<IntegrationData>('flight-integration-data.json', datasetId); },
};
