import React from 'react';
import CustomTable from './customtable';

require('./App.css');

export default class App extends React.Component {
	constructor() {
		super();

		numberType: []
	}

	componentDidMount() {

	}

	render() {
		return (
			<section>
				<CustomTable />
			</section>
		);
	}
}