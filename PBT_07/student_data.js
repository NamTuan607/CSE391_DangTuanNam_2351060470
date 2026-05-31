const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

function classifyStudent(avg) {
    if (avg >= 8.0) {
        return "Giỏi";
    }
    if (avg >= 6.5) {
        return "Khá";
    }
    if (avg >= 5.0) {
        return "Trung bình";
    }
    return "Yếu";
}

function formatAverage(value) {
    return value.toFixed(1);
}

const results = [];
let mathTotal = 0;
let physicsTotal = 0;
let csTotal = 0;

let countGioi = 0;
let countKha = 0;
let countTrungBinh = 0;
let countYeu = 0;

let topStudent = null;
let bottomStudent = null;

let maleTotal = 0;
let femaleTotal = 0;
let maleCount = 0;
let femaleCount = 0;

for (let i = 0; i < students.length; i++) {
    const student = students[i];
    const average = student.math * 0.4 + student.physics * 0.3 + student.cs * 0.3;
    const classification = classifyStudent(average);

    results.push({
        index: i + 1,
        name: student.name,
        average,
        classification,
    });

    mathTotal += student.math;
    physicsTotal += student.physics;
    csTotal += student.cs;

    if (classification === "Giỏi") {
        countGioi++;
    } else if (classification === "Khá") {
        countKha++;
    } else if (classification === "Trung bình") {
        countTrungBinh++;
    } else {
        countYeu++;
    }

    if (topStudent === null || average > topStudent.average) {
        topStudent = {
            name: student.name,
            average,
        };
    }

    if (bottomStudent === null || average < bottomStudent.average) {
        bottomStudent = {
            name: student.name,
            average,
        };
    }

    if (student.gender === "M") {
        maleTotal += average;
        maleCount++;
    } else if (student.gender === "F") {
        femaleTotal += average;
        femaleCount++;
    }
}

console.log("| STT | Tên    | TB  | Xếp loại    |");
console.log("|-----|--------|-----|-------------|");

for (let i = 0; i < results.length; i++) {
    const row = results[i];
    const paddedName = row.name.padEnd(6, " ");
    const paddedAvg = formatAverage(row.average).padEnd(3, " ");
    const paddedClass = row.classification.padEnd(11, " ");
    console.log(`| ${String(row.index).padEnd(3, " ")} | ${paddedName} | ${paddedAvg} | ${paddedClass} |`);
}

console.log("");
console.log("Số SV theo xếp loại:");
console.log(`- Giỏi: ${countGioi}`);
console.log(`- Khá: ${countKha}`);
console.log(`- Trung bình: ${countTrungBinh}`);
console.log(`- Yếu: ${countYeu}`);

console.log("");
console.log(`SV cao nhất: ${topStudent.name} (${formatAverage(topStudent.average)})`);
console.log(`SV thấp nhất: ${bottomStudent.name} (${formatAverage(bottomStudent.average)})`);

console.log("");
console.log("Điểm trung bình toàn lớp theo môn:");
console.log(`- Math: ${formatAverage(mathTotal / students.length)}`);
console.log(`- Physics: ${formatAverage(physicsTotal / students.length)}`);
console.log(`- CS: ${formatAverage(csTotal / students.length)}`);

console.log("");
console.log("Điểm trung bình theo giới tính:");
if (maleCount > 0) {
    console.log(`- Nam: ${formatAverage(maleTotal / maleCount)}`);
}
if (femaleCount > 0) {
    console.log(`- Nữ: ${formatAverage(femaleTotal / femaleCount)}`);
}
