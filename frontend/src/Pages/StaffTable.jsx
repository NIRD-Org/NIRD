import React, { useState } from "react";

const StaffTablePage = () => {
 
  const tableData = [
    {
    slNo: 1,
    name: "ANKIT KUMAR",
    state: "Andaman & Nicobar Islands",
    district: "South",
    block: "Ferrargunj",
    gpNames: "Chouldhari, Mithakhari, Namunaghar, Wandoor, Tushnabad, Sippighat",
    noOfGps: 6,
    population: 24031,
    spcDetails: "Arghya Santra",
  },
  {
    slNo: 2,
    name: "ATTADA KRISHNA",
    state: "Andhra Pradesh",
    district: "Krishna",
    block: "Guduru",
    gpNames: "Guduru, Kankatava, Akulamannadu, Kokanarayanapallem",
    noOfGps: 4,
    population: 12381,
    spcDetails: "Dr.P. Pavani",
  },
  {
    slNo: 3,
    name: "PARISAPOGU DANAIAH",
    state: "Andhra Pradesh",
    district: "Prakasam",
    block: "Marripudi",
    gpNames: "Marripudi, Kellampalli, Pannur, Kakarla",
    noOfGps: 4,
    population: 14266,
    spcDetails: "Dr.P. Pavani",
  },
  {
    slNo: 4,
    name: "ANUMALASETTY MOUNIKA",
    state: "Andhra Pradesh",
    district: "YSR",
    block: "Lakkireddipalle",
    gpNames: "Lakkireddipall, Maddirevula",
    noOfGps: 2,
    population: 14198,
    spcDetails: "Dr.P. Pavani",
  },
  {
    slNo: 5,
    name: "Prashant Kumar",
    state: "Arunachal Pradesh",
    district: "East Siang",
    block: "Mebo",
    gpNames: "Ayeng Begging, Ayeng Besok, Mebo Gidum, Mebo Ginkong, Darne",
    noOfGps: 5,
    population: 2210,
    spcDetails: "CHITRALEKHA BARUAH",
  },
  {
    slNo: 6,
    name: "Sanjay Kumar Saw",
    state: "Arunachal Pradesh",
    district: "Lower Siang",
    block: "Likabali",
    gpNames: "Malini, Silli, Kuntor, Dipa - A, Dipa – B",
    noOfGps: 5,
    population: 1904,
    spcDetails: "CHITRALEKHA BARUAH",
  },
  {
    slNo: 7,
    name: "DHUNU NARZARY",
    state: "Arunachal Pradesh",
    district: "Kra Daadi",
    block: "Palin",
    gpNames: "Dui, Yaglung, Bangte, Amji, Pania, Langdang",
    noOfGps: 6,
    population: 3032,
    spcDetails: "CHITRALEKHA BARUAH",
  },
  {
    slNo: 8,
    name: "SNIGDHA NEOG",
    state: "Assam",
    district: "Bongaigaon",
    block: "Dangtol",
    gpNames: "Mulagaon",
    noOfGps: 1,
    population: 9671,
    spcDetails: "CHITRALEKHA BARUAH",
  },
  {
    slNo: 9,
    name: "APARAJITA DEVI",
    state: "Assam",
    district: "Darrang",
    block: "Kalaigaon",
    gpNames: "Lakhimpur",
    noOfGps: 1,
    population: 8434,
    spcDetails: "CHITRALEKHA BARUAH",
  },
  {
    slNo: 10,
    name: "Mayuree Chetia",
    state: "Assam",
    district: "Morigaon",
    block: "Mayang",
    gpNames: "Deosal",
    noOfGps: 1,
    population: 9608,
    spcDetails: "CHITRALEKHA BARUAH",
  },
  
    {
      slNo: 11,
      name: "ANKITA BHARALI",
      state: "Assam",
      district: "Nagaon",
      block: "Kaliabor",
      gpNames: "Jakhalabandha",
      noOfGps: 1,
      population: 13827,
      spcDetails: "CHITRALEKHA BARUAH",
    },
    {
      slNo: 12,
      name: "Surajit Mogar",
      state: "Assam",
      district: "Goalpara",
      block: "Kuchdhowa",
      gpNames: "Lela",
      noOfGps: 1,
      population: 17341,
      spcDetails: "CHITRALEKHA BARUAH",
    },
    {
      slNo: 13,
      name: "Angita Kumari",
      state: "Bihar",
      district: "Gaya",
      block: "Nagar",
      gpNames: "Rasalpur, Korma",
      noOfGps: 2,
      population: 30686,
      spcDetails: "Vishal Prasad",
    },
    {
      slNo: 14,
      name: "PRIYANKA KUMARI",
      state: "Bihar",
      district: "Jamui",
      block: "Jamui",
      gpNames: "Garsanda, Arsaar",
      noOfGps: 2,
      population: 25866,
      spcDetails: "Vishal Prasad",
    },
    {
      slNo: 15,
      name: "RANVEER KUMAR",
      state: "Bihar",
      district: "Muzaffarpur",
      block: "Kanti",
      gpNames: "Paigambarpur Koluhua, Damodarpur",
      noOfGps: 2,
      population: 29325,
      spcDetails: "Vishal Prasad",
    },
    {
      slNo: 16,
      name: "ABHISHEK KUMAR",
      state: "Bihar",
      district: "Begusarai",
      block: "Bhagwanpur (ABP Block)",
      gpNames: "Kiratpur",
      noOfGps: 1,
      population: 17743,
      spcDetails: "Vishal Prasad",
    },
    {
      slNo: 17,
      name: "Savitri Sahu",
      state: "Chhattisgarh",
      district: "Narayanpur",
      block: "Narayanpur",
      gpNames: "Bade amhari, Belgaon, Bakulwahi, Borand, Halamimujmeta, Nawmunjmeta, Pharasgaon",
      noOfGps: 7,
      population: 9553,
      spcDetails: "Jadhav Vitthal Ramnath",
    },
    {
      slNo: 18,
      name: "Dhanendra Singh Patel",
      state: "Chhattisgarh",
      district: "PendraGaurellaMarwahi",
      block: "Gaurella",
      gpNames: "Dhanouli, Newarta, Anjani, Jhagrakhand, Chuktipani, Tendumunda",
      noOfGps: 6,
      population: 13079,
      spcDetails: "Jadhav Vitthal Ramnath",
    },
    {
      slNo: 19,
      name: "Rambhajan Kewat",
      state: "Chhattisgarh",
      district: "Korea",
      block: "Baikunthpur (ABP Block)",
      gpNames: "Patna, Chirguda , Dakaipara, Karji, Champajhar",
      noOfGps: 5,
      population: 13613,
      spcDetails: "Jadhav Vitthal Ramnath",
    },
    {
      slNo: 20,
      name: "Satish",
      state: "Chhattisgarh",
      district: "Durg",
      block: "Patan",
      gpNames: "Patora, Dhaurabhata, Chunkata, Funda, Mudpat",
      noOfGps: 5,
      population: 10063,
      spcDetails: "Jadhav Vitthal Ramnath",
    },

    {
      slNo: 21,
      name: "Naushina Hasan",
      state: "Chhattisgarh",
      district: "Bilaspur",
      block: "Masturi",
      gpNames: "Darrighat, Lawar, Karra, Kirari, Pendri",
      noOfGps: 5,
      population: 13718,
      spcDetails: "Jadhav Vitthal Ramnath",
    },
    {
      slNo: 22,
      name: "S. SEENAIAH",
      state: "Chhattisgarh",
      district: "Jashpur",
      block: "Kansabel",
      gpNames: "Sabadmunda, Kotanpani, Patrapali, Bansbahar, Devri, Chongribahar",
      noOfGps: 6,
      population: 13643,
      spcDetails: "Jadhav Vitthal Ramnath",
    },
    {
      slNo: 23,
      name: "Nimbalkar Digvijay Rajendrasinha",
      state: "Dadra and Nagar Haveli and Daman and Diu",
      district: "Diu",
      block: "Diu",
      gpNames: "Bucharwada GP, Zolawadi GP, Saudwadi GP, Vanakbara",
      noOfGps: 4,
      population: 28083,
      spcDetails: "-",
    },
    {
      slNo: 24,
      name: "MUHAMED AJAMAL M",
      state: "Goa",
      district: "South Goa",
      block: "Dharbhandora",
      gpNames: "Dharbhandora, Mollem, Collem",
      noOfGps: 3,
      population: 16677,
      spcDetails: "Jadhav Vitthal Ramnath",
    },
    {
      slNo: 25,
      name: "BHAGVAT RAJENDRA KEMDARE",
      state: "Gujarat",
      district: "Dohad",
      block: "Doahd",
      gpNames: "Nagarala, Gadoi, Vijagadh, Chandavada, Nasirpur",
      noOfGps: 5,
      population: 21358,
      spcDetails: "-",
    },
    {
      slNo: 26,
      name: "Varma Virendrakumar Dineshbhai",
      state: "Gujarat",
      district: "Vadodara",
      block: "Vadodara (City & Rural)",
      gpNames: "Nandesari, Padamala, Karachiya",
      noOfGps: 3,
      population: 21234,
      spcDetails: "-",
    },
    {
      slNo: 27,
      name: "GHOPE VASUDEO MADHUKAR",
      state: "Gujarat",
      district: "Bharuch",
      block: "Bharuch",
      gpNames: "Shuklatirth, Nikora, Tavara, Karjan",
      noOfGps: 4,
      population: 23040,
      spcDetails: "-",
    },
    {
      slNo: 28,
      name: "Naveen",
      state: "Haryana",
      district: "Nuh",
      block: "Indri",
      gpNames: "Chhachera, Kira, Alduka, Chhapera, Kurthla",
      noOfGps: 5,
      population: 10372,
      spcDetails: "-",
    },
    {
      slNo: 29,
      name: "VIKRAM SINGH",
      state: "Haryana",
      district: "Bhiwani",
      block: "Laharu (ABP Block)",
      gpNames: "Kharkari, Mohammad Nagar, Nakipur, Singhani",
      noOfGps: 4,
      population: 14627,
      spcDetails: "-",
    },
    {
      slNo: 30,
      name: "BADAL",
      state: "Haryana",
      district: "Rewari",
      block: "Nahar (ABP Block)",
      gpNames: "Bishoa, Karoli, Lukhi, Gujarwas",
      noOfGps: 4,
      population: 14677,
      spcDetails: "-",
    },
    {
        slNo: 31,
        name: "Rahul Ranjan",
        state: "Himachal Pradesh",
        district: "Chamba",
        block: "Chamba",
        gpNames: "Sarol, Dramman",
        noOfGps: 2,
        population: 4659,
        spcDetails: "Arghya Santra",
      },
      {
        slNo: 32,
        name: "SANDEEP KUMAR",
        state: "Himachal Pradesh",
        district: "Hamirpur",
        block: "Hamirpur",
        gpNames: "Daduhi, Bassi Jhanayara, Bajoori, Annu",
        noOfGps: 4,
        population: 11358,
        spcDetails: "Arghya Santra",
      },
      {
        slNo: 33,
        name: "Madho Ram",
        state: "Himachal Pradesh",
        district: "Hamirpur",
        block: "Bijhadi",
        gpNames: "Karer, Morsu Sultani, Sor, Bani, Garli",
        noOfGps: 5,
        population: 13010,
        spcDetails: "Arghya Santra",
      },
      {
        slNo: 34,
        name: "WASIM AHMAD BHAT",
        state: "Himachal Pradesh",
        district: "Hamirpur",
        block: "Bhoranj",
        gpNames: "Aghar, Tikker Didwin, Ukhli, Tal",
        noOfGps: 4,
        population: 11142,
        spcDetails: "Arghya Santra",
      },
      {
        slNo: 35,
        name: "Tushar Sharma",
        state: "Himachal Pradesh",
        district: "Kangra",
        block: "Dharamshala",
        gpNames: "Sokni Da-Kot, Dhagwar, Pantehar Passu, Bagli",
        noOfGps: 4,
        population: 10173,
        spcDetails: "Arghya Santra",
      },
      {
        slNo: 36,
        name: "SHEIKH AATIF",
        state: "Himachal Pradesh",
        district: "Kullu",
        block: "Kullu",
        gpNames: "Balh, Mohal, Jarad Bhuti Colony, Shamshi, Bhalang",
        noOfGps: 5,
        population: 15105,
        spcDetails: "Arghya Santra",
      },
      {
        slNo: 37,
        name: "Jusmaan Singh",
        state: "Himachal Pradesh",
        district: "Kullu",
        block: "Naggar",
        gpNames: "Katrai, Duada, Mandalgarh, Halan-2, Badagra, Pangan, Bran",
        noOfGps: 7,
        population: 17478,
        spcDetails: "Arghya Santra",
      },
      {
        slNo: 38,
        name: "MOHD JAVED ALAM",
        state: "Himachal Pradesh",
        district: "Kinnaur",
        block: "Kalpa",
        gpNames: "Telangi, Kalpa, Pangi, Khawangi, Roghi, Shudharang",
        noOfGps: 6,
        population: 11756,
        spcDetails: "Arghya Santra",
      },
      {
        slNo: 39,
        name: "SHAFAQAT NASIR",
        state: "Jammu & Kashmir",
        district: "Anantnag",
        block: "Anantnag",
        gpNames: "Chee, Anzulla, Aung",
        noOfGps: 3,
        population: 8087,
        spcDetails: "MANISH KUMAR SING",
      },
      {
        slNo: 40,
        name: "Abid Hussain",
        state: "Jammu & Kashmir",
        district: "Samba",
        block: "Ghagwal",
        gpNames: "Ghagwal, Harsath, Tapyal, Nonath",
        noOfGps: 4,
        population: 3510,
        spcDetails: "MANISH KUMAR SING",
      },
      {
        slNo: 41,
        name: "Rameez Ali Khoja",
        state: "Jammu & Kashmir",
        district: "Kupwara",
        block: "Trehgam",
        gpNames: "Trihgam-A, Trihgam-B, Trihgam-C, Trihgam-D, Trihgam-E, Trihgam-F",
        noOfGps: 6,
        population: 15598,
        spcDetails: "MANISH KUMAR SING",
      },
      {
        slNo: 42,
        name: "SHOWKAT AHMAD MIR",
        state: "Jammu & Kashmir",
        district: "Udhampur",
        block: "Majalata",
        gpNames: "Bhanara, Dharmara, Poeni, Majalata, Battal",
        noOfGps: 5,
        population: 9972,
        spcDetails: "MANISH KUMAR SING",
      },
      {
        slNo: 43,
        name: "RUPESH KUMAR",
        state: "Jharkhand",
        district: "Sahibganj",
        block: "Sahibganj",
        gpNames: "Ganga Prasad Pashim, Ganga Prasad Middle, Hajipur Purab",
        noOfGps: 3,
        population: 19960,
        spcDetails: "-",
      },
      {
        slNo: 44,
        name: "PRIYANKA",
        state: "Jharkhand",
        district: "Garhwa",
        block: "Meral",
        gpNames: "Meral Purab, Meral Pashim, Aragi",
        noOfGps: 3,
        population: 19276,
        spcDetails: "-",
      },
      {
        slNo: 45,
        name: "MANI MARDI",
        state: "Jharkhand",
        district: "Godda",
        block: "Godda",
        gpNames: "Peradih, Rupiyama, Lobanda",
        noOfGps: 3,
        population: 20384,
        spcDetails: "-",
      },
      {
        slNo: 46,
        name: "AMIT JAISAWAL",
        state: "Jharkhand",
        district: "Godda",
        block: "Pathargama",
        gpNames: "Pathargama, Machitad, Chikara Gobind",
        noOfGps: 3,
        population: 14095,
        spcDetails: "-",
      },
      {
        slNo: 47,
        name: "PRACHI PRIYAM",
        state: "Jharkhand",
        district: "Saraikela-Kharsawan",
        block: "Gamharia",
        gpNames: "Bandiha, Narainpur, Tontoposi",
        noOfGps: 3,
        population: 17390,
        spcDetails: "-",
      },
      {
        slNo: 48,
        name: "MANGAL KUMAR SINGH",
        state: "Jharkhand",
        district: "Jamtara",
        block: "Jamtara",
        gpNames: "Dulhadiha, Bewa, Udalbani",
        noOfGps: 3,
        population: 14145,
        spcDetails: "-",
      },
      {
        slNo: 49,
        name: "Maloth Mohanlal",
        state: "Karnataka",
        district: "Raichur",
        block: "Raichur",
        gpNames: "Gunjahalli GP, Yeragera GP",
        noOfGps: 2,
        population: 16583,
        spcDetails: "-",
      },
      {
        slNo: 50,
        name: "Gugulothu Saikumar",
        state: "Karnataka",
        district: "Yadgir",
        block: "Yadgir",
        gpNames: "Chandraki GP, Putpak GP",
        noOfGps: 2,
        population: 17006,
        spcDetails: "-",
      },
      {
        slNo: 51,
        name: "DEVOLLA MANOJ KUMAR",
        state: "Karnataka",
        district: "Bidar",
        block: "Aurad (ABP Block)",
        gpNames: "Korekal, Torna",
        noOfGps: 2,
        population: 15565,
        spcDetails: "-",
      },
      {
        slNo: 52,
        name: "AMIT KUMAR",
        state: "Karnataka",
        district: "Bidar",
        block: "Humnabad (ABP Block)",
        gpNames: "Hudgi, Nadgaon",
        noOfGps: 2,
        population: 18286,
        spcDetails: "-",
      },
      {
        slNo: 53,
        name: "Neena Krishnan B R",
        state: "Kerala",
        district: "Wayanad",
        block: "Kattikkulam",
        gpNames: "Tirunelli",
        noOfGps: 1,
        population: 22713,
        spcDetails: "-",
      },
      {
        slNo: 54,
        name: "SATHYA NARENDRAN",
        state: "Kerala",
        district: "Idukki",
        block: "Devikulam (ABP Block)",
        gpNames: "Varttavada, Kanthallor",
        noOfGps: 2,
        population: 24024,
        spcDetails: "-",
      },
      {
        slNo: 55,
        name: "SALINI V SASI",
        state: "Kerala",
        district: "Idukki",
        block: "Adimali",
        gpNames: "Adimali",
        noOfGps: 1,
        population: 31231,
        spcDetails: "-",
      },
      {
        slNo: 56,
        name: "KARTIKHA S",
        state: "Kerala",
        district: "Kasaragod",
        block: "Kasaragod",
        gpNames: "Madikkai",
        noOfGps: 1,
        population: 17000,
        spcDetails: "-",
      },
      {
        slNo: 57,
        name: "DIGVIJAY SINGH",
        state: "Madhya Pradesh",
        district: "Vidisha",
        block: "Vidihsa",
        gpNames: "Hansua, Jaitpura, Karira Laskarpur, Chidori, Dabar, Parsorahaveli",
        noOfGps: 6,
        population: 11830,
        spcDetails: "MANISH KUMAR SING",
      },
      {
        slNo: 58,
        name: "Rote Siddharth Ravindra",
        state: "Madhya Pradesh",
        district: "Alirajpur",
        block: "Sondwa",
        gpNames: "Ojhad, Sakdi, Temla, Kukdiya, Khamat, Kulwat, Walpur, Kakrana",
        noOfGps: 8,
        population: 16937,
        spcDetails: "MANISH KUMAR SING",
      },
      {
        slNo: 59,
        name: "Krishna Madhhasiya",
        state: "Madhya Pradesh",
        district: "Jhabua",
        block: "Petlawad",
        gpNames: "Gangakhedi, Mathmath, Ghughri, Karwad, Mandan, Gunawad",
        noOfGps: 6,
        population: 16048,
        spcDetails: "MANISH KUMAR SING",
      },
      {
        slNo: 60,
        name: "Harshal Suryawanshi",
        state: "Madhya Pradesh",
        district: "Khargone (West Nimar)",
        block: "Ziranya",
        gpNames: "Jhirniya, Kothada, Mundia, Kakriya, Dhamnod",
        noOfGps: 5,
        population: 11723,
        spcDetails: "MANISH KUMAR SING",
      },
      {
        slNo: 61,
        name: "Rinkesh Sahu",
        state: "Madhya Pradesh",
        district: "Ratlam",
        block: "Sailana",
        gpNames: "Shivgarh, Sundi, Bawdi, Kelda, Binti",
        noOfGps: 5,
        population: 13779,
        spcDetails: "MANISH KUMAR SING",
      },
      {
        slNo: 62,
        name: "AMAN KOUSHIK",
        state: "Madhya Pradesh",
        district: "Balaghat",
        block: "Balaghat",
        gpNames: "Kosami, Bagadara, Gongalai, Neveganv, Chichaganv, Naitara",
        noOfGps: 6,
        population: 22569,
        spcDetails: "MANISH KUMAR SING",
      },
      {
        slNo: 63,
        name: "AMAN TYAGI",
        state: "Madhya Pradesh",
        district: "Sheopur",
        block: "Karahal",
        gpNames: "Partwada, Piprani, Chitara, Panwada, Bargawan, Silpuri, Ajapura, Lalitpura",
        noOfGps: 8,
        population: 13553,
        spcDetails: "MANISH KUMAR SING",
      },
      {
        slNo: 64,
        name: "PATHAN AWEJKHA ILIYASKHA",
        state: "Madhya Pradesh",
        district: "Burhanpur",
        block: "Burhanpur",
        gpNames: "Dongargaon, Badziri, Bodarli, Badsingi, Jasondi",
        noOfGps: 4,
        population: 12935,
        spcDetails: "MANISH KUMAR SING",
      },
      {
        slNo: 65,
        name: "ANAND SHAKYA",
        state: "Madhya Pradesh",
        district: "Chindwara",
        block: "Tamia",
        gpNames: "Dhagariya, Ghatlinga, Doriyakheda, Jamundonga, Khursidhana, Delakhari, Khapakhurd",
        noOfGps: 7,
        population: 13372,
        spcDetails: "MANISH KUMAR SING",
      },
      {
        slNo: 66,
        name: "HEERA LAL JAISWAL",
        state: "Madhya Pradesh",
        district: "Anoopur",
        block: "Pusprajgarh (ABP)",
        gpNames: "Dhirutola, Bendi, Jelam, Girarikalan, Lakharo",
        noOfGps: 5,
        population: 13617,
        spcDetails: "MANISH KUMAR SING",
      },
      {
        slNo: 67,
        name: "DHARMENDRA SINGH THAKUR",
        state: "Madhya Pradesh",
        district: "Damoh",
        block: "Tendukheda (ABP)",
        gpNames: "Tejgarh, Sailwadamal, Samdai, Sanga, Bagdari, Tendukheda",
        noOfGps: 6,
        population: 12007,
        spcDetails: "MANISH KUMAR SING",
      },
      {
        slNo: 68,
        name: "Vikrant Lowanshi",
        state: "Madhya Pradesh",
        district: "Barwani",
        block: "Rajpur",
        gpNames: "Julvania, Panva, Nihali, Thakli, Rui",
        noOfGps: 5,
        population: 12021,
        spcDetails: "MANISH KUMAR SING",
      },
      {
        slNo: 69,
        name: "Nikhil Harishchandra Gore",
        state: "Maharashtra",
        district: "Gadchiroli",
        block: "Desaiganj",
        gpNames: "Tulashi, Kondhala, Kurud, Kinhala, Shivrajpur",
        noOfGps: 5,
        population: 16474,
        spcDetails: "Jadhav Vitthal Ramnath",
      },
      {
        slNo: 70,
        name: "Bedre Vishal Rustumrao",
        state: "Maharashtra",
        district: "Nasik",
        block: "Nasik",
        gpNames: "Pimpri Saiyyad, Lakhalgaon, Odha, Shilapur, Kotamgaon",
        noOfGps: 5,
        population: 22927,
        spcDetails: "Jadhav Vitthal Ramnath",
      },
      {
        slNo: 71,
        name: "Swapnil Ravasaheb Mane",
        state: "Maharashtra",
        district: "Dhule",
        block: "Dhule",
        gpNames: "Sanjori, Kundane War, Anand Khede",
        noOfGps: 3,
        population: 10563,
        spcDetails: "Jadhav Vitthal Ramnath",
      },
      {
        slNo: 72,
        name: "Wadmare Swapna Vinayak",
        state: "Maharashtra",
        district: "Ahmednagar",
        block: "Nagar",
        gpNames: "Chas, Pimpalgaon Kauda, Kamargaon, Akolner, Bhorwadi",
        noOfGps: 5,
        population: 17643,
        spcDetails: "Jadhav Vitthal Ramnath",
      },
      {
        slNo: 73,
        name: "KUMATKAR PRITAM RAMDAS",
        state: "Maharashtra",
        district: "Pune",
        block: "Shirur",
        gpNames: "Pabal, Kendur, Dhamari",
        noOfGps: 3,
        population: 17853,
        spcDetails: "Jadhav Vitthal Ramnath",
      },
      {
        slNo: 74,
        name: "Ingle Aditya Balurao",
        state: "Maharashtra",
        district: "Amravati",
        block: "Amravati",
        gpNames: "Pusada, Nandura Bk, Tembha, Gopalpur, Rohankheda",
        noOfGps: 5,
        population: 10349,
        spcDetails: "Jadhav Vitthal Ramnath",
      },
      {
        slNo: 75,
        name: "Bhuyar Nikhil Dnyaneshwar",
        state: "Maharashtra",
        district: "Kolhapur",
        block: "Kagal",
        gpNames: "Kasaba Sangaon, Mauje Sangaon, Pimpalgaon Kh, Vhannur, Karnur",
        noOfGps: 5,
        population: 20026,
        spcDetails: "Jadhav Vitthal Ramnath",
      },
      {
        slNo: 76,
        name: "GAIKWAD NIKITA CHANDRAHAR",
        state: "Maharashtra",
        district: "Solapur",
        block: "Akkalkot (ABP Block)",
        gpNames: "Mangrul, Tadwal, Mhaisalage",
        noOfGps: 3,
        population: 12697,
        spcDetails: "Jadhav Vitthal Ramnath",
      },
      {
        slNo: 77,
        name: "ASIYA ZAKIR SAYYAD",
        state: "Maharashtra",
        district: "Palghar",
        block: "Talasari (ABP Block)",
        gpNames: "Borigaon, Vasa, Vevaji",
        noOfGps: 3,
        population: 24104,
        spcDetails: "Jadhav Vitthal Ramnath",
      },
      {
        slNo: 78,
        name: "GAYAKWAD SHYAM VASANTRAO",
        state: "Maharashtra",
        district: "Osmanabad",
        block: "Lohara",
        gpNames: "Wadgaonwadi, Malegaon, Lohara (Kd), Bendkal",
        noOfGps: 5,
        population: 6782,
        spcDetails: "Jadhav Vitthal Ramnath",
      },
      {
        slNo: 79,
        name: "Shubham Rajkumar Gajbhiye",
        state: "Maharashtra",
        district: "Chandrapur",
        block: "Chandrapur",
        gpNames: "Tadali, Kosara, Morva, Vichoda Rai, Sakharwahi",
        noOfGps: 5,
        population: 14679,
        spcDetails: "Jadhav Vitthal Ramnath",
      },
      {
        slNo: 80,
        name: "PUKHRAMBAM BUDHACHANDRA SINGH",
        state: "Manipur",
        district: "Thoubal",
        block: "Wangjing CD Block",
        gpNames: "Tentha, Sapam, Tekcham, Samaram",
        noOfGps: 4,
        population: 26614,
        spcDetails: "CHITRALEKHA BARUAH",
      },
      {
        slNo: 81,
        name: "REZIA NAMEIRAKPAM",
        state: "Manipur",
        district: "Bishnupur",
        block: "Nambol",
        gpNames: "Leimapokpam, Keinou, Ishok",
        noOfGps: 3,
        population: 21005,
        spcDetails: "CHITRALEKHA BARUAH",
      },
      {
        slNo: 82,
        name: "Themshingphi Konghay",
        state: "Manipur",
        district: "Imphal East",
        block: "Sawombung CD Block",
        gpNames: "Waiton, Khundrakpam, Haraorou Tangkham, Sawombung",
        noOfGps: 4,
        population: 28501,
        spcDetails: "CHITRALEKHA BARUAH",
      },
      {
        slNo: 83,
        name: "BINOD KHANAL",
        state: "Meghalaya",
        district: "West Khasi Hills",
        block: "Mairang",
        gpNames: "Mawkarah Nongkdait, Mawkarah Nongpyndiang, Mawkarah Nongwahre, Mawkarah Mawpni",
        noOfGps: 4,
        population: 3207,
        spcDetails: "KAPURAPU MAHENDER",
      },
      {
        slNo: 84,
        name: "Talluri Saadhu",
        state: "Mizoram",
        district: "Serchhip",
        block: "East Lungdar",
        gpNames: "E. Lungdar, Leng, Sailulak, N. Mualcheng, Chekawn, Khawlailung, Piler",
        noOfGps: 7,
        population: 10950,
        spcDetails: "KAPURAPU MAHENDER",
      },
      {
        slNo: 85,
        name: "Pagutla Venkateswara Rao",
        state: "Mizoram",
        district: "Lunglei",
        block: "Lunglei",
        gpNames: "Haulawng, Mausen, Zotuitlang, Sekhum, N. Mualthuam, Ramlaitui, Pukpui",
        noOfGps: 7,
        population: 5822,
        spcDetails: "-",
      },
      {
        slNo: 86,
        name: "Mallekedi Sharath Chandra Prasad",
        state: "Odisha",
        district: "Kandhamal",
        block: "Phulbani Block",
        gpNames: "Keredi, Minia, Bisipada",
        noOfGps: 3,
        population: 11173,
        spcDetails: "TAPAS KUMAR MOHANTY",
      },
      {
        slNo: 87,
        name: "SHREETAM KALTA",
        state: "Odisha",
        district: "Nuapada",
        block: "Nuapada Block",
        gpNames: "Ansena, Saipala, Darlimunda",
        noOfGps: 3,
        population: 9805,
        spcDetails: "-",
      },
      {
        slNo: 88,
        name: "SANJIBANI MAJHI",
        state: "Odisha",
        district: "Keonjhar",
        block: "Keonjhar",
        gpNames: "Sirispal, Dimbo, Padmapur",
        noOfGps: 3,
        population: 22849,
        spcDetails: "-",
      },
      {
        slNo: 89,
        name: "RANJAN SABAT",
        state: "Odisha",
        district: "Sundargarh",
        block: "Sadar",
        gpNames: "Kinjira, Bhasma",
        noOfGps: 2,
        population: 8181,
        spcDetails: "-",
      },
      {
        slNo: 90,
        name: "KUMAR SHUBAM",
        state: "Punjab",
        district: "Kapurthala",
        block: "Sultanpur Lodhi (ABP Block)",
        gpNames: "Ahmedpur, Alladitta, Kamalpur, Latianwala, Mahablipur, Nasirewal, Sech, Toti",
        noOfGps: 8,
        population: 13873,
        spcDetails: "-",
      },
      {
        slNo: 91,
        name: "Shivani Rao",
        state: "Rajasthan",
        district: "Dholpur",
        block: "Bari",
        gpNames: "Ajeetpura, Aligarh, Bahadurpur",
        noOfGps: 3,
        population: 15547,
        spcDetails: "TAPAS KUMAR MOHANTY",
      },
      {
        slNo: 92,
        name: "Devesh Lawaniya",
        state: "Rajasthan",
        district: "Dungarpur",
        block: "Aspur",
        gpNames: "Amaratiya, Aspur, Badliya",
        noOfGps: 3,
        population: 13064,
        spcDetails: "TAPAS KUMAR MOHANTY",
      },
      {
        slNo: 93,
        name: "SAKIL ANSARI",
        state: "Rajasthan",
        district: "Sirohi",
        block: "Abu Road (ABP Block)",
        gpNames: "Jambudi, Jayadhara, Khadath",
        noOfGps: 3,
        population: 11117,
        spcDetails: "TAPAS KUMAR MOHANTY",
      },
      {
        slNo: 94,
        name: "RATAN RAJ",
        state: "Sikkim",
        district: "West District",
        block: "Dentam Block",
        gpNames: "Sangkhu Radukhandu, Dentam, Hee",
        noOfGps: 3,
        population: 9168,
        spcDetails: "Arghya Santra",
      },
      {
        slNo: 95,
        name: "Randhir P",
        state: "Tamil Nadu",
        district: "Virudhnagar",
        block: "Aruppukottai",
        gpNames: "Palavanatham, Kullorsandhai, Soolakkarai, T.Meenatchipuram",
        noOfGps: 4,
        population: 20806,
        spcDetails: "-",
      },
      {
        slNo: 96,
        name: "Ranjithkumar A",
        state: "Tamil Nadu",
        district: "Ramanatha-puram",
        block: "Ramanatha-puram",
        gpNames: "Peravoor, Chitharkottai, Athiyuthu, Peruvayal",
        noOfGps: 4,
        population: 16697,
        spcDetails: "-",
      },
      {
        slNo: 97,
        name: "SHYAMJITH T",
        state: "Tamil Nadu",
        district: "Madhurai",
        block: "Melur",
        gpNames: "Vellalur, Poonjuthi, Thiruvathavur",
        noOfGps: 3,
        population: 15064,
        spcDetails: "-",
      },
      {
        slNo: 98,
        name: "VIDYANIDHI SARASWATHI",
        state: "Telangana",
        district: "Khammam",
        block: "Khammam (Urban)",
        gpNames: "Raghunadha Palem, V Venkatayapalem, Chinthagurthi, Vepakuntla, Koyachalka, Regula Chalka",
        noOfGps: 6,
        population: 14874,
        spcDetails: "Dr.P. Pavani",
      },
      {
        slNo: 99,
        name: "NIMMALA SHEKHAR",
        state: "Telangana",
        district: "Warangal (Rural)",
        block: "Geesugonda",
        gpNames: "Geesugonda, Konaimakula, Rampur, MARIAPURAM, Gangadevipalli, Ookal",
        noOfGps: 6,
        population: 8594,
        spcDetails: "Dr.P. Pavani",
      },
      {
        slNo: 100,
        name: "NIDHI SINGH",
        state: "Telangana",
        district: "Ranga Reddy",
        block: "Kadthal",
        gpNames: "Kadthal",
        noOfGps: 1,
        population: 15000,
        spcDetails: "Dr.P. Pavani",
      },
      {
        slNo: 101,
        name: "CHELIKANI PADMALATHA",
        state: "Telangana",
        district: "Bhadradri Kothagudem",
        block: "Aswapuram",
        gpNames: "Aswapuram",
        noOfGps: 1,
        population: 13146,
        spcDetails: "Dr.P. Pavani",
      },
      {
        slNo: 102,
        name: "THALLOORI PAVAN KUMAR",
        state: "Telangana",
        district: "Jogulamba Gadwal",
        block: "Leeja",
        gpNames: "Medikonda, Pullikal, Kesavapuram, Venisampur",
        noOfGps: 4,
        population: 13042,
        spcDetails: "Dr.P. Pavani",
      },
      {
        slNo: 103,
        name: "BAIAH MAHESH",
        state: "Telangana",
        district: "Mahabubabad",
        block: "Gudur",
        gpNames: "Bhupathipet, Gudur, Ponugodu, Ayodhyapur, Bollepalle, Naikpally",
        noOfGps: 6,
        population: 14035,
        spcDetails: "Dr.P. Pavani",
      },
      {
        slNo: 104,
        name: "DHARMARAPU MAHESH",
        state: "Telangana",
        district: "Narayanapet",
        block: "Narayanapet",
        gpNames: "Perapalla, Shernapally, Singaram",
        noOfGps: 3,
        population: 13402,
        spcDetails: "Dr.P. Pavani",
      },
      {
        slNo: 105,
        name: "Sourabh Shukla",
        state: "Uttar Pradesh",
        district: "Sonbhadra",
        block: "Chopan",
        gpNames: "Adalganj, Aghorikhas, Barganwa, Chatarwar, Gauradeeh, Kargara, Kuracha",
        noOfGps: 7,
        population: 22376,
        spcDetails: "-",
      },
      {
        slNo: 106,
        name: "Amalraj Anjani Kumar Dubey",
        state: "Uttar Pradesh",
        district: "Balrampur",
        block: "Balrampur",
        gpNames: "Belwa Balui, Paigapur, Rowari, Bhagwanpur",
        noOfGps: 4,
        population: 15445,
        spcDetails: "-",
      },
      {
        slNo: 107,
        name: "Poonam Khatri",
        state: "Uttar Pradesh",
        district: "Fatehpur",
        block: "Vijayipur",
        gpNames: "Gazipur, Chakaitailly, Babara",
        noOfGps: 3,
        population: 4541,
        spcDetails: "-",
      },
      {
        slNo: 108,
        name: "Ravikant Yadav",
        state: "Uttar Pradesh",
        district: "Gorakhpur",
        block: "Bhathat",
        gpNames: "Budhadeeh, Islampur, Hafiznagar, Jamuniya, Rampur Khurd, Rampur Bujurg",
        noOfGps: 6,
        population: 13234,
        spcDetails: "-",
      },
      {
        slNo: 109,
        name: "Shivraj",
        state: "Uttar Pradesh",
        district: "Banaras",
        block: "Sevapuri",
        gpNames: "Baradeeh, Gairaha, Haribhanpur, Bazar kalika, Isarwar, Udraha",
        noOfGps: 6,
        population: 8387,
        spcDetails: "-",
      },
      {
        slNo: 110,
        name: "KAJAL YADAV",
        state: "Uttar Pradesh",
        district: "Chandauli",
        block: "Chakiya",
        gpNames: "Muzzafarpur, Bhamura, Raghunathpur, Bhatwara Kala",
        noOfGps: 4,
        population: 10879,
        spcDetails: "-",
      },
      {
        slNo: 111,
        name: "FIROZ KHAN",
        state: "Uttar Pradesh",
        district: "Bahraich",
        block: "Chitaura",
        gpNames: "Aminpur Nagaraur, Ashoka, Deeha, Itaunjha, Susrauli",
        noOfGps: 5,
        population: 13211,
        spcDetails: "-",
      },
      {
        slNo: 112,
        name: "VIVEK MISHRA",
        state: "Uttar Pradesh",
        district: "Chitrakoot",
        block: "Karwi",
        gpNames: "Khohi, Chitra Gokulpur, Chapramafi, Bhaganpur, Sangrampur",
        noOfGps: 5,
        population: 13251,
        spcDetails: "-",
      },
      {
        slNo: 113,
        name: "Vipul Ratnesh",
        state: "Uttar Pradesh",
        district: "Maharajganj",
        block: "Mithaura (ABP Block)",
        gpNames: "Baunia Raja, Arnahavan, Paneva Panei",
        noOfGps: 3,
        population: 15217,
        spcDetails: "-",
      },
      {
        slNo: 114,
        name: "PRABHANJAN KUMAR",
        state: "Uttarakhand",
        district: "Rudra Prayag",
        block: "Augustmuni",
        gpNames: "Ratura, Sumerpur, Shivanindi, Gadora, Maroda, Nagrashu, Beena",
        noOfGps: 7,
        population: 6633,
        spcDetails: "-",
      },
      {
        slNo: 115,
        name: "NITESH KANDWAL",
        state: "Uttarakhand",
        district: "Uttar Kashi",
        block: "Dunda",
        gpNames: "Gainvla (Bharsali), Baun, Panjiyala, Matli, Khattukhal, Juguldi",
        noOfGps: 6,
        population: 6537,
        spcDetails: "-",
      },
      {
        slNo: 116,
        name: "Krishna Gopal Mukherjee",
        state: "West Bengal",
        district: "Jalpaiguri",
        block: "Rajganj",
        gpNames: "Majhiali",
        noOfGps: 1,
        population: 65608,
        spcDetails: "Arghya Santra",
      },
      {
        slNo: 117,
        name: "ANAMIKA DUTTA",
        state: "West Bengal",
        district: "Paschim Medinipur",
        block: "Garbeta-III",
        gpNames: "Amsole",
        noOfGps: 1,
        population: 14964,
        spcDetails: "Arghya Santra",
      },
      {
        slNo: 118,
        name: "SUKANYA DATTA",
        state: "West Bengal",
        district: "Purba Medinipur",
        block: "Chandipur",
        gpNames: "Brindabanpur-1",
        noOfGps: 1,
        population: 15440,
        spcDetails: "Arghya Santra",
      },
      {
        slNo: 119,
        name: "PRADIPTA BARMAN",
        state: "West Bengal",
        district: "Murshidabad",
        block: "Behrampore",
        gpNames: "Madanpur",
        noOfGps: 1,
        population: 25052,
        spcDetails: "Arghya Santra",
      },
    ];
    const [sortedData, setSortedData] = useState([...tableData]);
    const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  
    const handleSort = (key) => {
      let direction = "ascending";
      if (sortConfig.key === key && sortConfig.direction === "ascending") {
        direction = "descending";
      }
  
      const sortedArray = [...sortedData].sort((a, b) => {
        if (a[key] < b[key]) {
          return direction === "ascending" ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
  
      setSortedData(sortedArray);
      setSortConfig({ key, direction });
    };

    return (
      <div className="p-6 bg-gray-50">
        {/* Page Title */}
        <h1 className="text-center text-[#004B86] text-2xl font-bold mb-6">
          Young Fellows, State Program Coordinator (SPC), and GPs Details
        </h1>
  
        {/* Responsive Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="w-full text-sm text-left text-gray-700 border-collapse">
            {/* Table Header */}
            <thead className="bg-[#004B86] text-white">
              <tr>
                <th
                  className="py-3 px-4 cursor-pointer"
                  onClick={() => handleSort("slNo")}
                >
                  Sl. No{" "}
                  {sortConfig.key === "slNo" &&
                    (sortConfig.direction === "ascending" ? "▲" : "▼")}
                </th>
                <th
                  className="py-3 px-4 cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  Name of Young Fellow{" "}
                  {sortConfig.key === "name" &&
                    (sortConfig.direction === "ascending" ? "▲" : "▼")}
                </th>
                <th
                  className="py-3 px-4 cursor-pointer"
                  onClick={() => handleSort("state")}
                >
                  State{" "}
                  {sortConfig.key === "state" &&
                    (sortConfig.direction === "ascending" ? "▲" : "▼")}
                </th>
                <th
                  className="py-3 px-4 cursor-pointer"
                  onClick={() => handleSort("district")}
                >
                  District{" "}
                  {sortConfig.key === "district" &&
                    (sortConfig.direction === "ascending" ? "▲" : "▼")}
                </th>
                <th
                  className="py-3 px-4 cursor-pointer"
                  onClick={() => handleSort("block")}
                >
                  Block{" "}
                  {sortConfig.key === "block" &&
                    (sortConfig.direction === "ascending" ? "▲" : "▼")}
                </th>
                <th
                  className="py-3 px-4 cursor-pointer"
                  onClick={() => handleSort("gpNames")}
                >
                  Names of GPs{" "}
                  {sortConfig.key === "gpNames" &&
                    (sortConfig.direction === "ascending" ? "▲" : "▼")}
                </th>
                <th
                  className="py-3 px-4 cursor-pointer"
                  onClick={() => handleSort("population")}
                >
                  Population{" "}
                  {sortConfig.key === "population" &&
                    (sortConfig.direction === "ascending" ? "▲" : "▼")}
                </th>
                <th
                  className="py-3 px-4 cursor-pointer"
                  onClick={() => handleSort("spcDetails")}
                >
                  SPC Name{" "}
                  {sortConfig.key === "spcDetails" &&
                    (sortConfig.direction === "ascending" ? "▲" : "▼")}
                </th>
              </tr>
            </thead>
  
            {/* Table Body */}
            <tbody>
              {sortedData.map((row, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-200`}
                >
                  <td className="py-3 px-4">{row.slNo}</td>
                  <td className="py-3 px-4">{row.name}</td>
                  <td className="py-3 px-4">{row.state}</td>
                  <td className="py-3 px-4">{row.district}</td>
                  <td className="py-3 px-4">{row.block}</td>
                  <td className="py-3 px-4">{row.gpNames}</td>
                  <td className="py-3 px-4">{row.population}</td>
                  <td className="py-3 px-4">{row.spcDetails}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default StaffTablePage;