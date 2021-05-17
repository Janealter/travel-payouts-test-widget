import { setupColors } from './utils/style';
import { setupDatePickers } from './utils/date-pickers';

import './styles/index.css';

setupColors();
setupDatePickers().catch(console.error);
