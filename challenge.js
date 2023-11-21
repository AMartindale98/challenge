/*
number: 351462
vision numbers for each:

3 is 5 + 1 + 4 = 10
5 is 3 + 1 + 4 + 6 + 2 = 16
1 is 5 + 4 = 9
4 is 3 + 5 + 1 + 6 + 2 = 21
6 is 3 + 5 + 1 + 4 + 2 = 15
2 is 4 + 6 = 10

the 1 has to be the lowest vision number, then it returns true. if it's not, it returns false.

*/

const number = 351462;

const visionNumber = function (num) {
  //convert number into an array so we can work on each individual number
  const arrayFromNum = num.toString().split("").map(Number);
  const arrOfObjs = [];

  //loop to address each number's vision number
  for (let i = 0; i < arrayFromNum.length; i++) {
    //finding the amount of numbers we should see behind and forward aka vision number
    let visionNum = arrayFromNum[i];

    //index of the current vision number
    let ind = arrayFromNum.indexOf(visionNum);

    //while loop loops over entire array. we create a new array to seek out the visionNum. a is our step counter, while b just ensures we loop through the entire array. we address undefined numbers since we may step out of the array entirely if the vision number is long enough. as long as variable a stays below visionNum, we continue to add neighboring numbers to the filteredArr.
    let b = 0;
    let a = 1;
    const filteredArr = [];
    while (b < arrayFromNum.length) {
      arrayFromNum.map((element) => {
        if (element === visionNum) {
          if (visionNum >= a) {
            if (
              arrayFromNum[ind - a] === undefined ||
              arrayFromNum[ind + a] === undefined ||
              arrayFromNum[ind + a] === 0
            ) {
              if (arrayFromNum[ind + a] !== undefined) {
                filteredArr.push(arrayFromNum[ind + a]);
              } else if (arrayFromNum[ind - a] !== undefined) {
                filteredArr.push(arrayFromNum[ind - a]);
              } else {
                return;
              }
            } else {
              filteredArr.push(arrayFromNum[ind - a]);
              filteredArr.push(arrayFromNum[ind + a]);
            }
            a++;
          }
        }
      });
      b++;
    }

    //using reduce method to find the visionSum. then storing each visionNum with their respective visionSum in an object.
    const finalVisionSum = filteredArr.reduce((a, b) => (a += b), 0);
    const obj = {};
    obj[visionNum] = finalVisionSum;
    arrOfObjs.push(obj);
  }
  console.log(arrOfObjs);

  //need lowestNum to compare to each value in our array of objects (the objects containing the visionNum with their respective visionSum). then compare the current number with the next number - the next number may end up being undefined if we are on the last number in the array. finally, we loop over the properties in each object to check if the obj that contains the property 1 matches our final lowest number. if it does, we log true to the console. if not, we log false.
  let lowestNum = 0;
  arrOfObjs.forEach((obj, i) => {
    console.log(obj);
    const curNum = Number(Object.values(obj).toString());
    const nextNum =
      arrOfObjs[i + 1] !== undefined
        ? Number(Object.values(arrOfObjs[i + 1]).toString())
        : undefined;

    if (nextNum !== undefined) {
      if (curNum < nextNum) {
        lowestNum = curNum;
        console.log(lowestNum);
      } else {
        lowestNum = nextNum;
      }
    } else lowestNum;
    for (const prop in obj) {
      console.log(lowestNum, obj);
      if (obj.hasOwnProperty(1) && obj[1] === lowestNum) {
        console.log(true);
      } else {
        console.log(false);
      }
    }
  });
};

//testing multiple times with the 1 in different places of the number
visionNumber(number);

visionNumber(213);

visionNumber(34871);
/*
2: 1 + 3 = 4;
1: 2 + 3 = 5;
3: 2 + 1 = 3;
logs true and is true - this works

3: 4 + 8 + 7 = 19;
4: 3 + 8 + 7 + 1 = 19;
8: 3 + 4 + 7 + 1 = 15;
7: 3 + 4 + 8 + 1 = 16;
1: 7 = 7;
logs true and is true - this works

*/
