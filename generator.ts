import { settings } from "./settings"

export function fullFillRandomShips(array: Array<any>) {

    settings.defaultShips.forEach((element: any) => {
        let orientation: string = randomArr(["left", "bottom"])
        let controler: boolean = false
        function fill(array: Array<any>) {
            let tempArr: Array<number> = randomPos((orientation), element)
            let arrayCopy: Array<any> = array.slice()
            try {
                for (var i: number = 0; i < element; i++)
                    if (orientation == "left" && array[tempArr[0]][tempArr[1] + i].value != 0) {
                        fill(arrayCopy)
                        return 0;
                    }
                    else if (orientation == "bottom" && array[tempArr[0] + i][tempArr[1]].value != 0) {
                        fill(arrayCopy)
                        return 0;
                    }
            }
            catch{
                fill(arrayCopy)
                return 0;
            }
            try {
                //ten kod jest tak chujowy, że może spowodować wyschnięcie jąder, epilepsję i wstrząsy, sugeruję go nie czytać i skipnąć do linijki 74
                if (orientation == "left")
                    for (var i: number = 0; i < element; i++) {
                        if (!controler) {
                            array[tempArr[0]][tempArr[1] + i].value = 1
                            array[tempArr[0]][tempArr[1] + i].orientation = orientation
                            array[tempArr[0]][tempArr[1] + i].length = element
                            if (array[tempArr[0] - 1] && array[tempArr[0] - 1][tempArr[1] + i] && array[tempArr[0] - 1][tempArr[1] + i].value == 0)
                                array[tempArr[0] - 1][tempArr[1] + i].value = 2
                            if (array[tempArr[0] + 1] && array[tempArr[0] + 1][tempArr[1] + i] && array[tempArr[0] + 1][tempArr[1] + i].value == 0)
                                array[tempArr[0] + 1][tempArr[1] + i].value = 2
                            if (i == 0 && array[tempArr[0]][tempArr[1] - 1] && array[tempArr[0]][tempArr[1] - 1].value == 0)
                                array[tempArr[0]][tempArr[1] - 1].value = 2
                            if (i == 0 && array[tempArr[0] + 1] && array[tempArr[0] + 1][tempArr[1] - 1] && array[tempArr[0] + 1][tempArr[1] - 1].value == 0)
                                array[tempArr[0] + 1][tempArr[1] - 1].value = 2
                            if (i == 0 && array[tempArr[0] - 1] && array[tempArr[0] - 1][tempArr[1] - 1] && array[tempArr[0] - 1][tempArr[1] - 1].value == 0)
                                array[tempArr[0] - 1][tempArr[1] - 1].value = 2
                            if (i == element - 1 && array[tempArr[0]][tempArr[1] + element] && array[tempArr[0]][tempArr[1] + element].value == 0)
                                array[tempArr[0]][tempArr[1] + element].value = 2
                            if (i == element - 1 && array[tempArr[0] - 1] && array[tempArr[0] - 1][tempArr[1] + element] && array[tempArr[0] - 1][tempArr[1] + element].value == 0)
                                array[tempArr[0] - 1][tempArr[1] + element].value = 2
                            if (i == element - 1 && array[tempArr[0] + 1] && array[tempArr[0 + 1]][tempArr[1] + element] && array[tempArr[0] + 1][tempArr[1] + element].value == 0)
                                array[tempArr[0] + 1][tempArr[1] + element].value = 2
                        }
                    }
                else if (orientation == "bottom")
                    for (var i: number = 0; i < element; i++) {
                        if (!controler) {
                            array[tempArr[0] + i][tempArr[1]].value = 1
                            array[tempArr[0] + i][tempArr[1]].orientation = orientation
                            array[tempArr[0] + i][tempArr[1]].length = element
                            if (array[tempArr[0] + i][tempArr[1] - 1] && array[tempArr[0] + i][tempArr[1] - 1].value == 0)
                                array[tempArr[0] + i][tempArr[1] - 1].value = 2
                            if (array[tempArr[0] + i][tempArr[1] + 1] && array[tempArr[0] + i][tempArr[1] + 1].value == 0)
                                array[tempArr[0] + i][tempArr[1] + 1].value = 2
                            if (i == 0 && array[tempArr[0] - 1] && array[tempArr[0] - 1][tempArr[1]] && array[tempArr[0] - 1][tempArr[1]].value == 0)
                                array[tempArr[0] - 1][tempArr[1]].value = 2
                            if (i == 0 && array[tempArr[0] - 1] && array[tempArr[0] - 1][tempArr[1] - 1] && array[tempArr[0] - 1][tempArr[1] - 1].value == 0)
                                array[tempArr[0] - 1][tempArr[1] - 1].value = 2
                            if (i == 0 && array[tempArr[0] - 1] && array[tempArr[0] - 1][tempArr[1] + 1] && array[tempArr[0] - 1][tempArr[1] + 1].value == 0)
                                array[tempArr[0] - 1][tempArr[1] + 1].value = 2
                            if (i == element - 1 && array[tempArr[0] + element] && array[tempArr[0] + element][tempArr[1]] && array[tempArr[0] + element][tempArr[1]].value == 0)
                                array[tempArr[0] + element][tempArr[1]].value = 2
                            if (i == element - 1 && array[tempArr[0] + element] && array[tempArr[0] + element][tempArr[1] - 1] && array[tempArr[0] + element][tempArr[1] - 1].value == 0)
                                array[tempArr[0] + element][tempArr[1] - 1].value = 2
                            if (i == element - 1 && array[tempArr[0] + element] && array[tempArr[0] + element][tempArr[1] + 1] && array[tempArr[0] + element][tempArr[1] + 1].value == 0)
                                array[tempArr[0] + element][tempArr[1] + 1].value = 2
                        }
                    }
            }
            catch{
                controler = true
                fill(arrayCopy)
                return 0;
            }
        }
        fill(array)
    });

    return array;

    function randomPos(curDir: string, element: number) {
        let curX: number
        let curY: number

        if (curDir == 'bottom') {
            curY = randomNum(0, array.length)
            curX = randomNum(0, (array[curY].length - element))
        }
        else {
            curY = randomNum(0, (array.length - element))
            curX = randomNum(0, array[curY].length)
        }
        return new Array(curY, curX);
    }

}

export function randomNum(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function randomArr(myArray: Array<any>) {
    let rand: string = myArray[Math.floor(Math.random() * myArray.length)];
    return rand;
}
