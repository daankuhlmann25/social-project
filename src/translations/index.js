export default {
	en: {
		name: 'Great Britain',
		load: () => { return import('./en.json'); },
	},
	sv: {
		name: 'Sverige',
		load: () => { return import('./sv.json'); },
	},
	nl: {
		name: 'Nederland',
		load: () => { return import('./nl.json'); },
	},
};
