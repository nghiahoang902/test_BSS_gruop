const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const input1 = document.querySelector('.input1');
const input2 = document.querySelector('.input2');
const dataForm = document.getElementById('data-form');

const sumArray = $('.sum-array');
const compareTowArray = $('.compare-array');
const invertedArray = $('.inverted-array');


dataForm.onsubmit = handleSubmit;
function handleSubmit(e) {
    e.preventDefault();

    if(input1.value >= 20 && input2.value <= 50) {
        const arrayAges = randomArray();

        //sắp xếp mẳng giảm dần
        let arraySBC = bubbleSort(arrayAges);
        console.log(arraySBC);
    
        //Sắp xếp phần từ lớn nhất cạnh phần tử nhỏ nhất trong mảng
        arraySBC = customSort(arrayAges);
    
        //Độ tuổi của bộ phận BS
        const arrayBS = randomArray();
    
        //Độ tuổi của bộ phận BP
        const arrayBP = randomArray();
    
        //Tạo mảng mới có chiều hoàn đổi mảng ban đầu
        const transposed = transposedArray(arraySBC, arrayBS, arrayBP)

        //console & add: sum array, compareArray, transposedArray to HTML
        addFunctionToHTML(arraySBC, arrayBS, arrayBP, transposed)

    }  else {
        alert("Please enter input1 >= 20 && input2 <= 50");
    }
}

//Tạo mảng ngẫu nhiên gồm 10 phần tử
function randomArray() {
    let arrayAges = [];
    while(arrayAges.length < 10) {
        const ageRandom = randomInteger(parseInt(input1.value), parseInt(input2.value))

        if(!arrayAges.includes(ageRandom)) {
            arrayAges.push(ageRandom);
        }
    }
    return arrayAges;
}

//Tạo số ngẫu nhiên từ 20 -> 50
function randomInteger(min, max) {
    return( Math.floor(min + Math.random()*(max - min + 1)))

}

//bubbleSort, sắp xếp mẳng giảm dần
function bubbleSort(arrayAges) {
    for(let i = 0; i < arrayAges.length - 1; i++) {
        for(let j = 0; j < arrayAges.length; j++) {
            if(arrayAges[j] < arrayAges[j+1]) {
                let temp = arrayAges[j]
                arrayAges[j] = arrayAges[j+1]
                arrayAges[j+1] = temp;
            }
        }
    }
    return arrayAges;
}

//Sắp xếp phần từ lớn nhất cạnh phần tử nhỏ nhất trong mảng
function customSort(ages) {
    let results = [];
    let left = 0, right = ages.length - 1;

    while(left < right) {
        try {
            if(ages[left] > ages[right]) {
                results.push(ages[left]);
                results.push(ages[right]);
            }
            left++;
            right--;
        } catch(e) {
            console.log('có lỗi xảy ra:', e);
        }
    }
    return results;
}

//So sánh 2 mảng, tìm ra phần tử trùng nhau giữa 2 mảng
function compareArray(a, b) {
    let array = [];
    for(let i = 0; i < a.length; i++) {
        for(let j = 0; j < b.length; j++) {
            if(a[i] == b[j]) {
                array.push(a[i]);
            }
        }
    }
    return array;
}


function addFunctionToHTML(arraySBC, arrayBS, arrayBP, transposed) {
    
    //add sum array to HTML
    console.log('SBC= ',arraySBC);
    console.log('BS= ',arrayBS);
    console.log('BP= ',arrayBP);

    sumArray.innerHTML = `
        <span>Array chứa từng bộ phận:</span>
        <span>SBC = [${arraySBC}]</span>
        <span>BS = [${arrayBS}]</span>
        <span>BP = [${arrayBP}]</span>
    `;

    //So sánh 2 mảng, tìm ra phần tử trùng nhau giữa 2 mảng
    const SBCvsBS = compareArray(arraySBC, arrayBS);
    const SBCvsBP = compareArray(arraySBC, arrayBP);
    const BSvsBP = compareArray(arrayBS, arrayBP);

    console.log('SBCvsBS=', SBCvsBS);
    console.log('SBCvsBP=', SBCvsBP);
    console.log('BSvsBP=', BSvsBP);

    //add compare array to HTML
    compareTowArray.innerHTML = `
        <span>So Sánh 2 array:</span>
        <span>SBCvsBS = [${SBCvsBS}]</span>
        <span>SBCvsBP = [${SBCvsBP}]</span>
        <span>BSvsBP = [${BSvsBP}]</span>
    `

    //Tạo mảng mới có chiều hoàn đổi mảng ban đầu
    console.log(transposed);
    let transposedNew = [];
    for(let i = 0; i < transposed.length; i++) {
        let transposedNews = transposed[i];
        console.log(transposedNews);
        transposedNew.push(`[${transposedNews}]`);
    }
    invertedArray.innerHTML = `
        <span>${transposedNew}</span>
    `;
}

//Tạo mảng mới có chiều hoàn đổi mảng ban đầu
function transposedArray(arraySBC, arrayBS, arrayBP) {
    const totalArray = [arraySBC, arrayBS, arrayBP];
    let transposed = [];
    let numRow = totalArray.length;
    let numCol = totalArray[0].length;

    for(let i = 0; i < numCol; i++) {
        transposed[i] = [];
        for(let j = 0; j < numRow; j++) {
            transposed[i][j] = totalArray[j][i];
        }
    }
    return transposed;
}
