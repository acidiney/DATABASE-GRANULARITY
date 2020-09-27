import GAnalytics from 'ganalytics';
import App from '@components/App';
import './index.css';
import { loadDatabase } from './assets/js/resources/database/index.mjs'

loadDatabase()

window.app = new App({
	target: document.querySelector('#app'),
	hydrate: true
});

if (process.env.NODE_ENV === 'production') {
	window.ga = new GAnalytics('UA-XXXXXXXX-X');

	// Additional production-specific code...
}
