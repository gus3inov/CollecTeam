import * as crypto from 'crypto';

/**
 * Current version typescript doesn't allowed static method interface
 */

export interface IStringHelper<T> {
	// lat: Array<T>;
	// rus: Array<T>;
	//
	// basename(path: T, suffix: T): T;
	//
	// getRandomString(length: number): T;
	//
	// sha512(password: T, salt: T): object;
	//
	// dirname(path: T): T;
	//
	// findIndexTranslit(string: T, arr: Array<T>, replaceArr: Array<T>): T;
	//
	// translit(string: T): T;
}

class StringHelper implements IStringHelper<string> {

	static lat: Array<string> = [
		'a',
		'b',
		'v',
		'g',
		'd',
		'e',
		'e',
		'gh',
		'z',
		'i',
		'y',
		'k',
		'l',
		'm',
		'n',
		'o',
		'p',
		'r',
		's',
		't',
		'u',
		'f',
		'h',
		'c',
		'ch',
		'sh',
		'sch',
		'y',
		'y',
		'y',
		'e',
		'yu',
		'ya',
	];

	static rus: Array<string> = [
		'а',
		'б',
		'в',
		'г',
		'д',
		'е',
		'ё',
		'ж',
		'з',
		'и',
		'й',
		'к',
		'л',
		'м',
		'н',
		'о',
		'п',
		'р',
		'с',
		'т',
		'у',
		'ф',
		'х',
		'ц',
		'ч',
		'ш',
		'щ',
		'ъ',
		'ы',
		'ь',
		'э',
		'ю',
		'я',
	];

	static basename(path: string, suffix: string = ''): string {
		let pathReg = path.replace(/^.*[\/\\]/g, '');

		if (pathReg.substr(pathReg.length - suffix.length) === suffix) {
			pathReg = pathReg.substr(0, pathReg.length - suffix.length);
		}

		return pathReg;
	}

	static getRandomString(length: number): string {
		return crypto.randomBytes(Math.ceil(length / 2))
			.toString('hex')
			.slice(0, length);
	}

	static sha512(password: string, salt: string): object {
		const hash = crypto.createHmac('sha512', salt);
		hash.update(password);
		const value = hash.digest('hex');

		return {
			salt,
			hash: value,
		};
	}

	static dirname(path: string): string {
		const pathReg: string = path.replace(/^.*[\/\\]/g, '');
		const pos = path.indexOf(pathReg);
		if (pos !== 0) {
			return path.substr(0, pos);
		}

		return '';
	}

	static findIndexTranslit(value: string, arr: Array<string>, replaceArr: Array<string>): string {
		let resultString: string = value;
		for (let i = 0; i < arr.length; i++) {
			const reg: RegExp = new RegExp(arr[i], 'g');

			resultString = resultString.replace(reg, replaceArr[i]);
		}

		return resultString;
	}

	static translit(value: string): string {
		let translitString = value.toLowerCase();

		translitString = this.findIndexTranslit(translitString, this.rus, this.lat);

		return translitString
			.replace(/\s/gi, '_')
			.replace(/[^_0-9-A-Za-zА-Яа-яЁё]/g, '')
			.replace(/\_+/g, '_')
			.replace(/\_$/g, '')
			.replace(/^\_/g, '');
	}

}

export default StringHelper;
