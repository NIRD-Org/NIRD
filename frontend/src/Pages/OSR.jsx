import React, { useState, useMemo } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const OSR = () => {

  const calculatePercentageChange = (newVal, oldVal) => {
    if (oldVal === 0) return "N/A"; // Avoid division by zero
    const change = ((newVal - oldVal) / oldVal) * 100;
    return `${change.toFixed(2)}%`;
  };
  const tableHeaders = [
    { label: "Sl. No.", key: "sl", width: "5%" },
    { label: "GP", key: "gp", width: "10%" },
    { label: "Block", key: "block", width: "10%" },
    { label: "State", key: "state", width: "10%" },
    { label: "OSR 2021-22 (in Rs.)", key: "osr2021", width: "8%" },
    { label: "OSR 2022-23 (in Rs.)", key: "osr2022", width: "8%" },
    { label: "OSR 2023-24 (in Rs.)", key: "osr2023", width: "8%" },
    { label: "% Change 2021-22 to 2022-23", key: "change2021to2022", width: "6%" },
    { label: "% Change 2022-23 to 2023-24", key: "change2022to2023", width: "6%" },
    { label: "Graph", key: "Graph", width: "21%" },
  ];
  const initialData = [ 
    ["1", "Pusada", "Amravati", "Maharashtra", 24000, 55000, 140000],
    ["2", "Nandura Bk", "Amravati", "Maharashtra", 18000, 48000, 121000],
    ["3", "Tembha", "Amravati", "Maharashtra", 12000, 34000, 108000],
    ["4", "Gopalpur", "Amravati", "Maharashtra", 14000, 39000, 92000],
    ["5", "Rohankheda", "Amravati", "Maharashtra", 25000, 47000, 105000],
    ["6", "Karnoor", "Kagal", "Maharashtra", 676232, 758056, 1472172],
    ["7", "Vhannur", "Kagal", "Maharashtra", 556232, 617655, 1072172],
    ["8", "Pimpalgaon Khurd", "Kagal", "Maharashtra", 500000, 660000, 980000],
    ["9", "Kasba Sangaon", "Kagal", "Maharashtra", 500000, 728890, 980000],
    ["10", "Mouje Sangaon", "Kagal", "Maharashtra", 656451, 723421, 9974582],
    ["11", "Anand Khede", "Dhule", "Maharashtra", 120000, 135000, 150000],
    ["12", "Kundane-War", "Dhule", "Maharashtra", 65000, 80000, 95000],
    ["13", "Sanjori", "Dhule", "Maharashtra", 42500, 50500, 55000],
    ["14", "Kotamgaon", "Nashik", "Maharashtra", 756232, 856897, 1272172],
    ["15", "Pimpri Sayyed", "Nashik", "Maharashtra", 11356789, 12167976, 15555482],
    ["16", "Shilapur", "Nashik", "Maharashtra", 803960, 895930, 1692500],
    ["17", "Pachira", "Surajpur", "Chhattisgarh", 0, 1000, 43500],
    ["18", "Girwarganj", "Surajpur", "Chhattisgarh", 178429, 1000, 52000],
    ["19", "Karwan", "Surajpur", "Chhattisgarh", 36492, 0, 37000],
    ["20", "Keshawnagar", "Surajpur", "Chhattisgarh", 0, 84248, 137000],
    ["21", "Nayanpur", "Surajpur", "Chhattisgarh", 0, 27200, 18006],
    ["22", "Dhanouli", "Guarella", "Chhattisgarh", 100000, 11000, 120000],
    ["23", "Jhagrakhand", "Guarella", "Chhattisgarh", 10000, 12000, 15000],
    ["24", "Nevsa", "Guarella", "Chhattisgarh", 5000, 5000, 5000],
    ["25", "Tendumuda", "Guarella", "Chhattisgarh", 5000, 5000, 5000],
    ["26", "Aourda", "Pussore", "Chhattisgarh", 0, 8654, 12000],
    ["27", "Chhichorumariya", "Pussore", "Chhattisgarh", 0, 50000, 50000],
    ["28", "Garhumariya", "Pussore", "Chhattisgarh", 0, 42000, 56000],
    ["29", "Darrighat", "Masturi", "Chhattisgarh", 30000, 44000, 55000],
    ["30", "Lawar", "Masturi", "Chhattisgarh", 20000, 35000, 50000],
    ["31", "Karra", "Masturi", "Chhattisgarh", 50000, 58000, 69000],
    ["32", "Kirari", "Masturi", "Chhattisgarh", 45000, 51000, 59000],
    ["33", "Pendri", "Masturi", "Chhattisgarh", 35000, 42000, 55000],
    ["34", "Champajhar", "Bainkuthpur", "Chhattisgarh", 1000, 1000, 1000],
    ["35", "Chirguda", "Bainkuthpur", "Chhattisgarh", 1000, 1000, 1000],
    ["36", "Dakaipara", "Bainkuthpur", "Chhattisgarh", 1000, 1000, 1000],
    ["37", "Karji", "Bainkuthpur", "Chhattisgarh", 1000, 1000, 1000],
    ["38", "Patna", "Bainkuthpur", "Chhattisgarh", 10000, 10000, 10000],
    ["39", "Patora", "Patan", "Chhattisgarh", 180000, 200000, 320000],
    ["40", "Funda", "Patan", "Chhattisgarh", 67000, 85000, 150000],
    ["41", "Mudpar", "Patan", "Chhattisgarh", 0, 20000, 75000],
    ["42", "Chunkatta", "Patan", "Chhattisgarh", 0, 0, 130000],
    ["43", "Dhourabhata", "Patan", "Chhattisgarh", 0, 0, 150000],
    ["44", "Borand", "Narayanpur", "Chhattisgarh", 56307, 126682, 147564],
    ["45", "Pabal", "Shirur", "Maharashtra", 2842018, 2360380, 1558632],
    ["46", "Dhamari", "Shirur", "Maharashtra", 2842018, 6663176, 3605654],
    ["47", "Kendur", "Shirur", "Maharashtra", 2316301, 1844744, 1805638],
    ["48", "Akolner", "Nagar", "Maharashtra", 7946603, 5857115, 991240],
    ["49", "Bhorwadi", "Nagar", "Maharashtra", 3581353, 842687, 833545],
    ["50", "Chas", "Nagar", "Maharashtra", 5535946, 6448103, 5464200],
    ["51", "Kamargaon", "Nagar", "Maharashtra", 2760519, 4057268, 1225457],
    ["52", "Pimplegaon Kauda", "Nagar", "Maharashtra", 207292, 893288, 209936],
    ["53", "Odha", "Nashik", "Maharashtra", 6807802, 5847005, 8580000],
    ["54", "Lakhalgaon", "Nashik", "Maharashtra", 4337305, 339494, 6593790],
    ["55", "Anjani", "Guarella", "Chhattisgarh", 5000, 5000, 5000],
    ["56", "Chuktipani", "Guarella", "Chhattisgarh", 5000, 5000, 5000],
   
    ["57", "Belgaon", "Narayanpur", "Chhattisgarh", 100422, 167923, 162424],
    ["58", "Bakulwahi", "Narayanpur", "Chhattisgarh", 314233, 107507, 55524],
    ["59", "Nawmunjmeta", "Narayanpur", "Chhattisgarh", 638552, 918996, 372418],
    ["60", "Halamimunjhmeta", "Narayanpur", "Chhattisgarh", 72588, 115965, 132270],
    ["61", "Pharasgaon", "Narayanpur", "Chhattisgarh", 480146, 308174, 330612],
    ["62", "Damkheda", "Zirniya", "Madhya Pradesh", 800000, 1007000, 1105000],
    ["63", "Patajan", "Khalwa", "Madhya Pradesh", 70000, 203000, 890000],
    ["64", "Fefari Sarkar", "Khalwa", "Madhya Pradesh", 0, 1000, 150000],
    ["65", "Padliya", "Khalwa", "Madhya Pradesh", 20000, 50000, 100000],
    ["66", "Tigariya", "Khalwa", "Madhya Pradesh", 0, 0, 50000],
    ["67", "Timarni", "Khalwa", "Madhya Pradesh", 0, 1000, 100000],
    ["68", "Jamanya Sarsari", "Khalwa", "Madhya Pradesh", 0, 1000, 40000],
    ["69", "Karwad", "Petalwad", "Madhya Pradesh", 60000, 258960, 332740],
    ["70", "Gangag Khedi", "Petalwad", "Madhya Pradesh", 10000, 102000, 140000],
    ["71", "Ghughari", "Petalwad", "Madhya Pradesh", 40000, 50000, 50000],
    ["72", "Gunawad", "Petalwad", "Madhya Pradesh", 1000, 32860, 50000],
    ["73", "Mathmath", "Petalwad", "Madhya Pradesh", 3000, 93384, 100000],
    ["74", "Mandan", "Petalwad", "Madhya Pradesh", 20000, 35554, 98766],
    ["75", "Beejanwada", "Pipariya", "Madhya Pradesh", 150000, 162000, 145000],
    ["76", "Matkuli", "Pipariya", "Madhya Pradesh", 185000, 226000, 248000],
    ["77", "Panari", "Pipariya", "Madhya Pradesh", 45000, 54300, 41500],
    ["78", "Richheda", "Pipariya", "Madhya Pradesh", 23000, 25000, 10000],
    ["79", "Samnapur", "Pipariya", "Madhya Pradesh", 265714, 86734, 10000],
    ["80", "Taronkalan", "Pipariya", "Madhya Pradesh", 2500, 60000, 3500],
    ["81", "Shivgarh", "Sailana", "Madhya Pradesh", 900000, 1100000, 1300000],
    ["82", "Walpur", "Sondwa", "Madhya Pradesh", 55000, 150000, 257000],
    ["83", "Julwania", "Rajpur", "Madhya Pradesh", 445000, 610000, 1250000],
    ["84", "Ngopa", "Ngopa", "Mizoram", 1000000, 1700000, 3000000],
    ["85", "Bhaganpur", "Chitrakoot", "Uttar Pradesh", 1000, 50000, 1180000],
    ["86", "Chhapra Mafi", "Chitrakoot", "Uttar Pradesh", 50000, 50000, 1600000],
    ["87", "Khamat", "Sondwa", "Madhya Pradesh", 0, 700, 0],
    ["88", "Panwa", "Rajpur", "Madhya Pradesh", 0, 0, 11500],
    ["89", "Nihali", "Rajpur", "Madhya Pradesh", 0, 0, 6000],
    ["90", "Amb", "Balwal", "Jammu & Kashmir", 4200, 5000, 10000],
    ["91", "Bhalwal Upper-A", "Balwal", "Jammu & Kashmir", 3000, 5000, 8000],
    ["92", "Bhalwal Lower", "Balwal", "Jammu & Kashmir", 20000, 30000, 32000],
    ["93", "Chowa", "Balwal", "Jammu & Kashmir", 12000, 10000, 15000],
    ["94", "Doomi", "Balwal", "Jammu & Kashmir", 5000, 5000, 8000],
    ["95", "CHEE", "Anantnag", "Jammu & Kashmir", 0, 0, 3950],
    ["96", "Aung", "Balwal", "Jammu & Kashmir", 0, 0, 3600],
    ["97", "Anzwala", "Balwal", "Jammu & Kashmir", 0, 0, 3300],
    ["98", "Trehgam A", "Trehgram", "Jammu & Kashmir", 0, 0, 4500],
    ["99", "Trehgam B", "Trehgram", "Jammu & Kashmir", 0, 0, 5500],
    ["100", "Trehgam C", "Trehgram", "Jammu & Kashmir", 0, 0, 6500],
    ["101", "Trehgam D", "Trehgram", "Jammu & Kashmir", 0, 0, 5000],
    ["102", "Trehgam E", "Trehgram", "Jammu & Kashmir", 0, 0, 6800],
    ["103", "Trehgam F", "Trehgram", "Jammu & Kashmir", 0, 0, 12000],
    ["104", "Aghar Jitto", "Katra", "Jammu & Kashmir", 8000, 12000, 10000],
    ["105", "Akhli Buttan", "Katra", "Jammu & Kashmir", 2912, 3619, 3214],
    ["106", "Hutt", "Katra", "Jammu & Kashmir", 12000, 12000, 14000],
    ["107", "Mebo Gingkong", "Mebo", "Arunachal Pradesh", 600, 1000, 1200],
    ["108", "Mebo Gidum", "Mebo", "Arunachal Pradesh", 600, 1000, 1200],
    ["109", "Ayeng Beging", "Mebo", "Arunachal Pradesh", 600, 1000, 1200],
    ["110", "Ayeng Besok", "Mebo", "Arunachal Pradesh", 600, 1000, 1200],
    ["111", "Darne", "Mebo", "Arunachal Pradesh", 600, 1000, 1200],
    ["112", "Malini", "Likabali", "Arunachal Pradesh", 100, 500, 1000],
    ["113", "Silli", "Likabali", "Arunachal Pradesh", 100, 500, 1000],
    ["114", "Kuntor", "Likabali", "Arunachal Pradesh", 100, 500, 1000],
    ["115", "Dipa I", "Likabali", "Arunachal Pradesh", 100, 500, 1000],
    ["116", "Dipa II", "Likabali", "Arunachal Pradesh", 100, 500, 1000],
    ["117", "Santipur", "Sivsagar", "Assam", 18000, 18000, 18000],
    ["118", "Deosal", "Mayang", "Assam", 80000, 40000, 52000],
    ["119", "Khundrakpam", "Sawombung", "Manipur", 0, 10000, 10000],
    ["120", "E Khawdungsei", "Ngopa", "Mizoram", 2000, 3500, 5000],
    ["121", "Khawkawn", "Ngopa", "Mizoram", 1000, 1200, 2500],
    ["122", "Chiahpui", "Ngopa", "Mizoram", 35000, 42000, 50000],
    ["123", "Kawlbem", "Ngopa", "Mizoram", 15000, 25000, 45000],
    ["124", "Pawlrang", "Ngopa", "Mizoram", 45000, 50000, 60000],
    ["125", "East Lungdar", "East Lungdar", "Mizoram", 32000, 35000, 35000],
    ["126", "Leng", "East Lungdar", "Mizoram", 70000, 72000, 75000],
    ["127", "Sailulak", "East Lungdar", "Mizoram", 182000, 200000, 200000],
    ["128", "Khawlailung", "East Lungdar", "Mizoram", 83000, 92000, 100000],
    ["129", "Raibania", "Jaleswar", "Odisha", 85000, 94000, 110000],
    ["130", "Shyamnagar", "Jaleswar", "Odisha", 87000, 91000, 99000],
    ["131", "Sardarbandh", "Jaleswar", "Odisha", 12200, 12200, 16762],
    ["132", "KEREDI", "Phulbani", "Odisha", 39230, 44150, 48100],
    ["133", "BISIPADA", "Phulbani", "Odisha", 48000, 55000, 64000],
    ["134", "MINIA", "Phulbani", "Odisha", 42000, 46500, 53000],
    ["135", "Bharsuja", "Agalpur", "Odisha", 254600, 282000, 357000],
    ["136", "Nuniapali", "Agalpur", "Odisha", 85800, 93400, 96200],
    ["137", "Jharnipali", "Agalpur", "Odisha", 180600, 185500, 220000],
    ["138", "Ashpur", "Ashpur", "Rajasthan", 10000, 10000, 10000],
    ["139", "Amaritiya", "Ashpur", "Rajasthan", 10000, 10000, 10000],
    ["140", "Badaliya", "Ashpur", "Rajasthan", 10000, 10000, 10000],
    ["141", "Vanakbar", "Diu", "DNH&DD", 2684300, 2864300, 3060200],
    ["142", "Bucharwad", "Diu", "DNH&DD", 3113900, 3342600, 3562400],
    ["143", "Zolawadi", "Diu", "DNH&DD", 3468300, 3652400, 3864500],
    ["144", "Saudwadi", "Diu", "DNH&DD", 2965300, 3264500, 3489600],
    ["145", "PUTPAK", "Yadigiri", "Karnataka", 200000, 786312, 648677],
    ["146", "Chandarki", "Yadigiri", "Karnataka", 200000, 559754, 550000],
    ["147", "YERAGERA", "Raichur", "Karnataka", 800000, 1000000, 1200000],
    ["148", "GUNJAHALLI", "Raichur", "Karnataka", 250000, 300000, 400000],
    ["149", "Peravoor", "Ramanadpuram", "Tamil Nadu", 2264377, 1153420, 1225358],
    ["150", "Peruvayal", "Ramanadpuram", "Tamil Nadu", 147993, 385000, 432000],
    ["151", "Athiyuthu", "Ramanadpuram", "Tamil Nadu", 349140, 543500, 672188],
    ["152", "Chittarkottai", "Ramanadpuram", "Tamil Nadu", 1275369, 1372560, 1478875],
    ["153", "Vadiya", "Nandood", "Gujarat", 10000, 10000, 10000],
    ["154", "Thari", "Nandood", "Gujarat", 10000, 10000, 10000],
    ["155", "Karatha", "Nandood", "Gujarat", 10000, 10000, 10000],
    ["156", "Lachhras", "Nandood", "Gujarat", 10000, 10000, 10000],
    ["157", "Gopalpura", "Nandood", "Gujarat", 10000, 10000, 10000],
    ["158", "Vavdi", "Nandood", "Gujarat", 10000, 10000, 10000],
    ["159", "Andhatri", "Mahuva", "Gujarat", 8000, 9000, 10000],
    ["160", "Mudat", "Mahuva", "Gujarat", 12000, 13500, 14500],
    ["161", "Vadiya", "Mahuva", "Gujarat", 8000, 9200, 10000],
    ["162", "Dungari", "Mahuva", "Gujarat", 12500, 13500, 14750],
    ["163", "Naldhara", "Mahuva", "Gujarat", 12500, 13700, 15000],
    ["164", "Sokni Da-Kot", "Dharamshala", "Himachal Pradesh", 100000, 10000, 100000],
    ["165", "Pantehar Passu", "Dharamshala", "Himachal Pradesh", 7540, 7460, 7700],
    ["166", "Dhagwar", "Dharamshala", "Himachal Pradesh", 35950, 35950, 40000],
    ["167", "Bagli", "Dharamshala", "Himachal Pradesh", 26500, 26500, 27000],
    ["168", "Sangrampur", "Chitrakoot", "Uttar Pradesh", 50000, 50000, 12000],
    ["169", "Rajganj", "Rajganj", "West Bengal", 660000, 770000, 800000],
    ["170", "ALDUKA", "INDRI(NUH)", "Haryana", 180000, 300000, 650000],
    ["171", "KIRA", "INDRI(NUH)", "Haryana", 80000, 150000, 250000],
    ["172", "CHHAPERA", "INDRI(NUH)", "Haryana", 120000, 150000, 275000],
    ["173", "CHHACHERA", "INDRI(NUH)", "Haryana", 75000, 150000, 200000],
    ["174", "KURTHLA", "INDRI(NUH)", "Haryana", 125000, 250000, 450000],
    ["175", "Bani", "Bijhri", "Himachal Pradesh", 65000, 120000, 150000],
    ["176", "Garli", "Bijhri", "Himachal Pradesh", 52710, 55000, 60000],
    ["177", "Karer", "Bijhri", "Himachal Pradesh", 110946, 120000, 160000],
    ["178", "Morsu Sultani", "Bijhri", "Himachal Pradesh", 7083, 65000, 100000],
    ["179", "Saur", "Bijhri", "Himachal Pradesh", 60000, 80000, 100000],
    ["180", "Gazipur", "Bahua", "Uttar Pradesh", 100000, 100000, 100000],
    ["181", "Banwara", "Bahua", "Uttar Pradesh", 100000, 100000, 100000],
    ["182", "Chaikitailly", "Bahua", "Uttar Pradesh", 100000, 100000, 100000],
    ["183", "Jamunia", "Bhathat", "Uttar Pradesh", 0, 2000, 5000],
    ["184", "Islampur", "Bhathat", "Uttar Pradesh", 0, 2000, 5000],
    ["185", "Haphij Nagar", "Bhathat", "Uttar Pradesh", 0, 2000, 5000],
    ["186", "Budadeeh", "Bhathat", "Uttar Pradesh", 0, 2000, 5000],
    ["187", "Rampur Khurd", "Bhathat", "Uttar Pradesh", 0, 2000, 5000],
    ["188", "Rampur Bujurg", "Bhathat", "Uttar Pradesh", 0, 2000, 5000],
    ["189", "Gairaha", "Sevapuri", "Uttar Pradesh", 829621, 50000, 100],
    ["190", "Baradeeh", "Sevapuri", "Uttar Pradesh", 2000, 1000, 100],
    ["191", "Haribhanpur", "Sevapuri", "Uttar Pradesh", 2000, 10000000, 600000],
    ["192", "Bazar Kalika", "Sevapuri", "Uttar Pradesh", 2000, 1000, 100],
    ["193", "Adalganj", "Chopan", "Uttar Pradesh", 0, 2000, 5000],
    ["194", "Kargara", "Chopan", "Uttar Pradesh", 0, 2000, 5000],
    ["195", "Gurdah", "Chopan", "Uttar Pradesh", 0, 2000, 5000],
    ["196", "Agori Khas", "Chopan", "Uttar Pradesh", 0, 2000, 5000],
    ["197", "Barganwa", "Chopan", "Uttar Pradesh", 0, 2000, 5000],
    ["198", "Chatarwar", "Chopan", "Uttar Pradesh", 0, 2000, 5000],
    ["199", "Kurccha", "Chopan", "Uttar Pradesh", 0, 2000, 5000],
    ["200", "Ronwari", "Balrampur", "Uttar Pradesh", 0, 36492, 37000],
    ["201", "Paigapur", "Balrampur", "Uttar Pradesh", 0, 0, 16000],
    ["202", "Bhagwanpur", "Balrampur", "Uttar Pradesh", 0, 0, 230000],
    ["203", "Baluwa Balui", "Balrampur", "Uttar Pradesh", 0, 2640, 260000],
    ["204", "Patan Patani", "Lohaghat", "Uttarakhand", 0, 1000, 71000],
    ["205", "Kolidek", "Lohaghat", "Uttarakhand", 0, 1000, 20000],
    ["206", "Raikot Mahar", "Lohaghat", "Uttarakhand", 0, 1000, 11000],
    ["207", "Raikot Kanwar", "Lohaghat", "Uttarakhand", 0, 1000, 12000],
    ["208", "Chauri Rai", "Lohaghat", "Uttarakhand", 0, 100, 27000],
    ["209", "RANKA", "RANKA", "Sikkim", 165834, 197170, 317591],
    ["210", "Rey Mendu", "RANKA", "Sikkim", 255000, 245000, 250000],
    ["211", "LUING PARBING", "RANKA", "Sikkim", 165000, 181000, 172000],
    ["212", "RAWTEY RUMTEK", "RANKA", "Sikkim", 235000, 280000, 285000],
    ["213", "Sarol", "Chamba", "Himachal Pradesh", 100000, 16600, 283500],
    ["214", "Dramman", "Chamba", "Himachal Pradesh", 240000, 25500, 677250],
    ["215", "Katrai", "Naggar", "Himachal Pradesh", 120000, 120000, 140000],
    ["216", "Hallan 2", "Naggar", "Himachal Pradesh", 120000, 120000, 140000],
    ["217", "Duwara", "Naggar", "Himachal Pradesh", 70000, 68000, 90000],
    ["218", "Pangan", "Naggar", "Himachal Pradesh", 70000, 90000, 110000],
    ["219", "Bran", "Naggar", "Himachal Pradesh", 80000, 110000, 140000],
    ["220", "Baragran", "Naggar", "Himachal Pradesh", 70000, 86000, 90000],
    ["221", "Mandalgarh", "Naggar", "Himachal Pradesh", 80000, 90000, 100000],
    ["222", "Kurud", "Desaiganj", "Maharashtra", 1853898, 1912597, 1905400],
    ["223", "Kondhala", "Desaiganj", "Maharashtra", 1327360, 1202663, 1350000],
    ["224", "Shivrajpur", "Desaiganj", "Maharashtra", 620000, 1103649, 730000],
    ["225", "Tulshi", "Desaiganj", "Maharashtra", 698414, 1150495, 712000],
    ["226", "Kinhala", "Desaiganj", "Maharashtra", 399457, 522480, 423000],
    ["227", "Jaithpur", "Wankidi", "Telangana", 110168, 156752, 190880],
    ["228", "Tejapur", "Wankidi", "Telangana", 132542, 109592, 152167],
    ["229", "Bendara", "Wankidi", "Telangana", 143490, 136444, 183558],
    ["230", "Khamana", "Wankidi", "Telangana", 203830, 276720, 459382],
    ["231", "Khiridi", "Wankidi", "Telangana", 207154, 211287, 271581],
    ["232", "Naveguda", "Wankidi", "Telangana", 50390, 111290, 91250],
    ["233", "Indhani", "Wankidi", "Telangana", 251254, 217283, 327936]

  ];

  const [tableData, setTableData] = useState(initialData.map(item => ({
    sl: item[0],
    gp: item[1],
    block: item[2],
    state: item[3],
    osr2021: item[4],
    osr2022: item[5],
    osr2023: item[6],
    change2021to2022: calculatePercentageChange(item[5], item[4]),
    change2022to2023: calculatePercentageChange(item[6], item[5])
  })));

  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    const sortedData = [...tableData].sort((a, b) => {
      if (key.includes('change')) { // Sort by percentage change, parsing the string
        const valueA = parseFloat(a[key]) || 0;
        const valueB = parseFloat(b[key]) || 0;
        return direction === "asc" ? valueA - valueB : valueB - valueA;
      }
      return direction === "asc" ? a[key] - b[key] : b[key] - a[key]; // Numerical sort
    });
    setSortConfig({ key, direction });
    setTableData(sortedData);
  };

  const renderBarGraph = (values) => {
    const max = Math.max(...values);
    return (
      <div style={{ display: "flex", height: "10px" }}>
        {values.map((value, index) => (
          <div
            key={index}
            style={{
              width: `${(value / max) * 100}%`,
              backgroundColor: index === 0 ? "#0074D9" : index === 1 ? "#2ECC40" : "#FF4136",
              marginRight: "2px"
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold text-center text-[#004B86] mb-6">
        Gram Panchayat OSR Achievement Report
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 text-center">
          <thead>
            <tr className="bg-gray-200">
              {tableHeaders.map((header) => (
                <th
                  key={header.key}
                  className="py-2 px-4 border cursor-pointer"
                  onClick={() => handleSort(header.key)}
                >
                  {header.label} {sortConfig.key === header.key && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="py-2 px-4 border">{row.sl}</td>
                <td className="py-2 px-4 border">{row.gp}</td>
                <td className="py-2 px-4 border">{row.block}</td>
                <td className="py-2 px-4 border">{row.state}</td>
                <td className="py-2 px-4 border">{row.osr2021.toLocaleString()}</td>
                <td className="py-2 px-4 border">{row.osr2022.toLocaleString()}</td>
                <td className="py-2 px-4 border">{row.osr2023.toLocaleString()}</td>
               
                <td className="py-2 px-4 border">{row.change2021to2022}</td>
                <td className="py-2 px-4 border">{row.change2022to2023}</td>
                <td className="py-2 px-4 border">{renderBarGraph([row.osr2021, row.osr2022, row.osr2023])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OSR;