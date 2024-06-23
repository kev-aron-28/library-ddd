import { ContainerBuilder, YamlFileLoader } from "node-dependency-injection";
import path from 'path';

const container = new ContainerBuilder();
const loader = new YamlFileLoader(container);
try {
  loader.load(path.resolve(__dirname, './application.yaml'));
} catch (error) {
  console.error('Error loading services:', error);
}


export default container;
