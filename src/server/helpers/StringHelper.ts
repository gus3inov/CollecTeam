export interface IStringHelper<T> {
    lat: Array<T>;
    rus: Array<T>;

    basename(path: T, suffix: T): T;

}

class StringHelper implements IStringHelper<string> {

    static lat: Array<string> = [
        "a",
        "b",
        "v",
        "g",
        "d",
        "e",
        "e",
        "gh",
        "z",
        "i",
        "y",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "r",
        "s",
        "t",
        "u",
        "f",
        "h",
        "c",
        "ch",
        "sh",
        "sch",
        "y",
        "y",
        "y",
        "e",
        "yu",
        "ya"
    ];

    static rus: Array<string> = [
        "а",
        "б",
        "в",
        "г",
        "д",
        "е",
        "ё",
        "ж",
        "з",
        "и",
        "й",
        "к",
        "л",
        "м",
        "н",
        "о",
        "п",
        "р",
        "с",
        "т",
        "у",
        "ф",
        "х",
        "ц",
        "ч",
        "ш",
        "щ",
        "ъ",
        "ы",
        "ь",
        "э",
        "ю",
        "я"
    ];

    /*
     * @param {string} - path. Путь
     * @param {string} - suffix. Если имя файла оканчивается суффиком, то мы его можем удалить
     * @return {string}
     */

    static basename(path: string, suffix: string = ""): string {
        let pathReg = path.replace(/^.*[\/\\]/g, "");

        if (pathReg.substr(pathReg.length - suffix.length) == suffix) {
            pathReg = pathReg.substr(0, pathReg.length - suffix.length);
        }

        return pathReg;
    }

    /*
     * @param {string} - path. Путь
     * @return {string}
     */

    static dirname(path: string): string {
        let pathReg: string = path.replace(/^.*[\/\\]/g, ""),
            pos: number = path.indexOf(pathReg);
        if (pos !== 0) {
            return path.substr(0, pos);
        }

        return "";
    }

    /*
     * @param {string} - string. Строка
     * @param {string[]} - arr. Массив строк, который будет проиндексирован в зависимости от входных значений в атрибут string
     * @param {string[]} - replaceArr. Массив строк, значения которых заменяют проиндексированные значения массива arr
     * @return {string}
     */

    static findIndexTranslit(string: string, arr: Array<string>, replaceArr: Array<string>): string {
        let resultString: string = string;
        for (let i: number = 0; i < arr.length; i++) {
            let reg: RegExp = new RegExp(arr[i], "g");

            resultString = resultString.replace(reg, replaceArr[i]);
        }

        return resultString;
    }

    /*
     * @param {string} - string. Строка
     * @return {string}
     */

    static translit(string: string): string {
        let translitString = string.toLowerCase();

        translitString = this.findIndexTranslit(translitString, this.rus, this.lat);

        return translitString
            .replace(/\s/gi, "_")
            .replace(/[^_0-9-A-Za-zА-Яа-яЁё]/g, "")
            .replace(/\_+/g, "_")
            .replace(/\_$/g, "")
            .replace(/^\_/g, "");
    }

}

export default StringHelper;
