import { promises as fs } from 'fs';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ url }) {
	const papers = await fs.readFile('src/routes/work/papers.md', { encoding: 'utf-8' });
	const papers_array = papers.split(/\r?\n|\r|\n/g);

	const paperPromises = [];
	for (let [index, item] of Object.entries(papers_array)) {
		const year = item.match(/(20\d{2})\...[a-zA-Z]/)?.[0];
		const regex = /(.*)(Alex Lee|Alex J Lee|Alex J. Lee)(.*)(https:.*)./
		const regex_search = regex.exec(item);

		if (regex_search == null) {
			paperPromises.push({ item: item, details: {}, year: year })

		} else {
			const url = regex_search[4]
			const after_name = regex_search[3]
			const name = regex_search[2]
			const before_name = regex_search[1]

			paperPromises.push({
				type: 'paper',
				item: item,
				year: year,
				details: { before_name: before_name, name: name, after_name: after_name, url: url }
			})
		}
	};


	const preprints = await fs.readFile('src/routes/work/preprints.md', { encoding: 'utf-8' })
	const preprints_array = preprints.split(/\r?\n|\r|\n/g);

	for (let [index, item] of Object.entries(preprints_array)) {
		const year = item.match(/(20\d{2})\...[a-zA-Z]/)?.[1];
		const regex = /(.*)(Alex Lee|Alex J Lee|Alex J. Lee)(.*)(https:.*)./
		const regex_search = regex.exec(item);

		if (regex_search == null) {
			paperPromises.push({ item: item, details: {}, year: year })

		} else {
			const url = regex_search[4]
			const after_name = regex_search[3]
			const name = regex_search[2]
			const before_name = regex_search[1]

			paperPromises.push({
				type: 'preprint',
				item: item,
				year: year,
				details: { before_name: before_name, name: name, after_name: after_name, url: url }
			})
		}

	};





	return {
		body: paperPromises,
		status: 200,
	};
}
