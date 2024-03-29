const Excel = require("exceljs");
const { v4: uuidv4 } = require("uuid");
const workbook = new Excel.Workbook();
const worksheet = workbook.addWorksheet("Sheet 1");
const path = require("path");

worksheet.columns = [
    { header: "STT", key: "num", width: 5 },
    { header: "Ví", key: "wallet_name", width: 20 },
    { header: "Danh mục", key: "catagory", width: 20 },
    { header: "Số tiền", key: "money", width: 15 },
    { header: "Chú thích", key: "description", width: 50 },
    { header: "Với ai", key: "with_people", width: 20 },
    { header: "Ngày", key: "date", width: 20 },
];

const exportExcel = async (data) => {
    worksheet.addRows(data);
    const randomName = uuidv4();
    const filePath = path.resolve(`excels/${randomName}.xlsx`);
    await workbook.xlsx.writeFile(filePath);
    return filePath;
};

module.exports = { exportExcel };
