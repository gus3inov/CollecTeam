/**
 * Current version typescript doesn't allowed static method interface
 */

export interface IHashMapHelper {
	// rowMap(Map: object, separator: string): string;
}

class HashMapHelper implements IHashMapHelper {
	static rowMap(Map: object, separator: string = '>'): string {
		let row = '';
		let i = 0;

		for (const key in Map) {
			if (Map.hasOwnProperty(key)) {
				i++;
				i === Object.keys(Map).length ? (
					row += `${key} ${separator} '${Map[key]}'`
				) : (
					row += `${key} ${separator} '${Map[key]}', `
				);
			}
		}

		return row;
	}
}

export default HashMapHelper;
