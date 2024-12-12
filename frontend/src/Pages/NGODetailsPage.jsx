import React from 'react';

function NGODetailsPage() {
  const data = [
      { deployment: "Andaman & Nicobar Islands", name: "ANKIT KUMAR", block: "Ferrargunj", gPs: "Chouldhari, Mithakhari, Namunaghar, Wandoor, Tushnabad, Sippighat", ngo: "N/A", year: "N/A", remarks: "N/A" },
      { deployment: "Andhra Pradesh", name: "ATTADA KRISHNA", block: "Guduru", gPs: "Guduru,Kankatava, Akulamannadu, Kokanarayanapallem", ngo: "N/A", year: "N/A", remarks: "N/A" },
      { deployment: "Andhra Pradesh", name: "PARISAPOGU DANAIAH", block: "Marripudi", gPs: "Marripudi, Kellampalli,Pannur, Kakarla", ngo: "N/A", year: "N/A", remarks: "N/A" },
      { deployment: "Andhra Pradesh", name: "ANUMALASETTY MOUNIKA", block: "Lakkireddipalle", gPs: "Lakkireddipall, Maddirevula", ngo: "N/A", year: "N/A", remarks: "N/A" },
      { deployment: "Arunachal Pradesh", name: "Prashant Kumar", block: "Mebo", gPs: "Ayeng Begging, Ayeng Besok, Mebo Gidum, Mebo Ginkong, Darne", ngo: "N/A", year: "N/A", remarks: "N/A" },
      { deployment: "Arunachal Pradesh", name: "Sanjay Kumar Saw", block: "Likabali", gPs: "Malini, Silli, Kuntor, Dipa - A, Dipa – B", ngo: "N/A", year: "N/A", remarks: "N/A" },
      { deployment: "Arunachal Pradesh", name: "DHUNU NARZARY", block: "Palin", gPs: "Dui, Yaglung, Bangte, Amji, Pania, Langdang", ngo: "N/A", year: "N/A", remarks: "N/A" },
      { deployment: "Assam", name: "SNIGDHA NEOG", block: "Dangtol", gPs: "Mulagaon", ngo: "N/A", year: "N/A", remarks: "N/A" },
      { deployment: "Assam", name: "APARAJITA DEVI", block: "Kalaigaon", gPs: "Lakhimpur", ngo: "N/A", year: "N/A", remarks: "N/A" },
      { deployment: "Assam", name: "Mayuree Chetia", block: "Mayang", gPs: "Deosal", ngo: "N/A", year: "N/A", remarks: "N/A" },
      { deployment: "Assam", name: "ANKITA BHARALI", block: "Kaliabor", gPs: "Jakhalabandha", ngo: "N/A", year: "N/A", remarks: "N/A" },
      { deployment: "Assam", name: "Surajit Mogar", block: "Kuchdhowa", gPs: "Lela", ngo: "N/A", year: "N/A", remarks: "N/A" },
      { deployment: "Bihar", name: "Angita Kumari", block: "Nagar", gPs: "Rasalpur, Korma", ngo: "CENTRE DIRECT", year: "N/A", remarks: "N/A" },
      { deployment: "Bihar", name: "PRIYANKA KUMARI", block: "Jamui", gPs: "Garsanda, Arsaar", ngo: "N/A", year: "N/A", remarks: "N/A" },
      { deployment: "Bihar", name: "RANVEER KUMAR", block: "Kanti", gPs: "Paigambarpur Koluhua, Damodarpur", ngo: "N/A", year: "N/A", remarks: "N/A" },
      { deployment: "Chhattisgarh", name: "Savitri Sahu", block: "Narayanpur", gPs: "Bade amhari, Belgaon, Bakulwahi, Borand, Halamimujmeta, Nawmunjmeta, Pharasgaon", ngo: "Piramal Foundation, TRiF", year: "TRiF - Oct23, Piramal- Sep24", remarks: "N/A" },
      { deployment: "Chhattisgarh", name: "Dhanendra Singh Patel", block: "Gaurella", gPs: "Dhanouli, Newarta, Anjani, Jhagrakhand, Chuktipani, Tendumunda", ngo: "N/A", year: "N/A", remarks: "N/A" },
      { deployment: "Chhattisgarh", name: "Rambhajan Kewat", block: "Baikunthpur (ABP Block)", gPs: "Patna, Chirguda , Dakaipara, Karji, Champajhar", ngo: "N/A", year: "N/A", remarks: "N/A" },
      { deployment: "Chhattisgarh", name: "Satish", block: "Patan", gPs: "Patora, Dhaurabhata, Chunkata, Funda, Mudpat", ngo: "N/A", year: "N/A", remarks: "N/A" },
      { deployment: "Chhattisgarh", name: "Naushina Hasan", block: "Masturi", gPs: "Darrighat, Lawar, Karra, Kirari, Pendri", ngo: "N/A", year: "N/A", remarks: "N/A" },
      { deployment: "Chhattisgarh", name: "S. SEENAIAH", block: "Kansabel", gPs: "Sabadmunda, Kotanpani, Patrapali, Bansbahar, Devri, Chongribahar", ngo: "N/A", year: "N/A", remarks: "N/A" },
      { deployment: "Dadra and Nagar Haveli and Daman and Diu", name: "Nimbalkar Digvijay Rajendrasinha", block: "Diu", gPs: "Bucharwada GP, Zolawadi GP, Saudwadi GP, Vanakbara", ngo: "N/A", year: "N/A", remarks: "N/A" },
      { deployment: "Goa", name: "MUHAMED AJAMAL M", block: "Dharbhandora", gPs: "Dharbhandora, Mollem, Collem", ngo: "Green Goa Foundation", year: "1986", remarks: "N/A" },
      { deployment: "Gujarat", name: "BHAGVAT RAJENDRA KEMDARE", block: "Dohad", gPs: "Nagarala, Gadoi, Vijagadh, Chandavada, Nasirpur", ngo: "N/A", year: "N/A", remarks: "N/A" },
      { deployment: "Gujarat", name: "Varma Virendrakumar Dineshbhai", block: "Vadodara (City & Rural)", gPs: "Nandesari, Padamala, Karachiya", ngo: "Deepak Foundation", year: "N/A", remarks: "N/A" },
      { deployment: "Gujarat", name: "GHOPE VASUDEO MADHUKAR", block: "Bharuch", gPs: "Shuklatirth, Nikora, Tavara, Karjan", ngo: "N/A", year: "N/A", remarks: "N/A" },
      { deployment: "Haryana", name: "Naveen", block: "Indri", gPs: "Chhachera, Kira, Alduka, Chhapera, Kurthla", ngo: "N/A", year: "N/A", remarks: "N/A" },
      { deployment: "Haryana", name: "VIKRAM SINGH", block: "Laharu (ABP Block)", gPs: "Kharkari,Mohammad nagar,Nakipur,Singhani", ngo: "N/A", year: "N/A", remarks: "N/A" },
      { deployment: "Haryana", name: "BADAL", block: "Nahar (ABP Block)", gPs: "Bishoa,Karoli,Lukhi, Gujarwas", ngo: "N/A", year: "N/A", remarks: "N/A" },
      { deployment: "Himachal Pradesh", name: "Rahul Ranjan", block: "Chamba", gPs: "Sarol, Dramman", ngo: "N/A", year: "N/A", remarks: "N/A" },
      { deployment: "Himachal Pradesh", name: "SANDEEP KUMAR", block: "Hamirpur", gPs: "Daduhi, Bassi Jhanayara, Bajoori, Annu", ngo: "N/A", year: "N/A", remarks: "N/A" },
      { deployment: "Himachal Pradesh", name: "Madho Ram", block: "Bijhadi", gPs: "Karer, Morsu Sultani, Sor, Bani, Garli", ngo: "N/A", year: "N/A", remarks: "N/A" },
      { deployment: "Himachal Pradesh", name: "WASIM AHMAD BHAT", block: "Bhoranj", gPs: "Aghar, Tikker Didwin, Ukhli, Tal", ngo: "N/A", year: "N/A", remarks: "N/A" },
      { deployment: "Himachal Pradesh", name: "Tushar Sharma", block: "Dharamshala", gPs: "Sokni Da-Kot, Dhagwar, Pantehar Passu, Bagli", ngo: "Waste Warrior", year: "2022", remarks: "Its operating in GP Sokni Da-Kot since 2022." },
      { deployment: "Himachal Pradesh", name: "SHEIKH AATIF", block: "Kullu", gPs: "Balh, Mohal, Jarad Bhuti Colony, Shamshi, Bhalang", ngo: "N/A", year: "N/A", remarks: "N/A" },
      { deployment: "Himachal Pradesh", name: "Jusmaan Singh", block: "Naggar", gPs: "Katrai, Duada, Mandalgarh, Halan-2, Badagra, Pangan, Bran", ngo: "N/A", year: "N/A", remarks: "N/A" },
      { deployment: "Himachal Pradesh", name: "MOHD JAVED ALAM", block: "Kalpa", gPs: "Telangi, Kalpa, Pangi, Khawangi, Roghi, Shudharang", ngo: "N/A", year: "N/A", remarks: "N/A" },
      { deployment: "Jammu & Kashmir", name: "SHAFAQAT NASIR", block: "Anantnag", gPs: "Chee, Anzulla, Aung", ngo: "N/A", year: "N/A", remarks: "N/A" },
      { deployment: "Jammu & Kashmir", name: "Abid Hussain", block: "Ghagwal", gPs: "Ghagwal, Harsath, Tapyal, Nonath", ngo: "N/A", year: "N/A", remarks: "N/A" },
      { deployment: "Jammu & Kashmir", name: "Rameez Ali Khoja", block: "Trehgam", gPs: "Trihgam-A, Trihgam-B, Trihgam-C, Trihgam-D, Trihgam-E, Trihgam-F", ngo: "N/A", year: "N/A", remarks: "N/A" },
      { deployment: "Jharkhand", name: "RUPESH KUMAR", block: "Sahibganj", gPs: "Ganga Prasad Pashim, Ganga Prasad Middle, Hajipur Purab", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Jharkhand", name: "PRIYANKA", block: "Meral", gPs: "Meral Purab, Meral Pashim, Aragi", ngo: "Piramal Foundation", year: "2023", remarks: "As mentioned in the letter from MoPR, One gram panchayat was allocated to me and the other gram panchayat was allocated to Piramal Foundation for special gram sabha cum training on 2nd Oct 2024 apart from that no support has received in any other activities till now." },
  { deployment: "Jharkhand", name: "MANI MARDI", block: "Godda", gPs: "Peradih, Rupiyama, Lobanda", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Jharkhand", name: "AMIT JAISAWAL", block: "Pathargama", gPs: "Pathargama, Machitad, Chikara Gobind", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Jharkhand", name: "PRACHI PRIYAM", block: "Gamharia", gPs: "Bandiha, Narainpur, Tontoposi", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Jharkhand", name: "MANGAL KUMAR SINGH", block: "Jamtara", gPs: "Dulhadiha, Bewa, Udalbani", ngo: "Badlao Foundation", year: "N/A", remarks: "Working in Udalbani Panchayat" },
  { deployment: "Karnataka", name: "Maloth Mohanlal", block: "Raichur", gPs: "Gunjahalli GP, Yeragera GP", ngo: "Water Aid, Swami Vivekanand NGO", year: "1. August-2024, 2. 2019", remarks: "1. WaterAid is working to improve access to clean water, decent toilets, and awareness about ODF (Open Defecation Free villages) and good hygiene for rural communities. It has been active in the Gunjhalli GP project since August 2024. 2. Swami Vivekananda NGO is working on improving access to clean water and good hygiene for school children and rural communities. It has been active in both project GPs, Yeragera and Gunjhalli, since 2019." },
  { deployment: "Karnataka", name: "Gugulothu Saikumar", block: "Gurumitkal", gPs: "Chandraki GP, Putpak GP", ngo: "Tata Kalike Trust, Shri Kshetra Dharmasthala Rural Development Project", year: "1. 2010, 2. 2015", remarks: "N/A" },
  { deployment: "Karnataka", name: "DEVOLLA MANOJ KUMAR", block: "Aurad (ABP Block)", gPs: "Badalgaon, Sundhal", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Karnataka", name: "AMIT KUMAR", block: "Humnabad (ABP Block)", gPs: "Hudgi, Nadgaon", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Kerala", name: "Neena Krishnan B R", block: "SULTAN BATHERY", gPs: "Meenangadi", ngo: "THANAL", year: "2016", remarks: "1. Carbon Neutral Awareness Campaigns 2. ABHA ID card creation camps" },
  { deployment: "Kerala", name: "SATHYA NARENDRAN", block: "Devikulam (ABP Block)", gPs: "Varttavada, Kanthallor", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Kerala", name: "SALINI V SASI", block: "Adimali", gPs: "Adimali", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Kerala", name: "KARTIKHA S", block: "Kasaragod", gPs: "Madikkai", ngo: "Kudumbashree", year: "1998", remarks: "N/A" },
  { deployment: "Madhya Pradesh", name: "DIGVIJAY SINGH", block: "Vidihsa", gPs: "Hansua, Jaitpura, Karira Laskarpur, Chidori, Dabar, Parsorahaveli", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Madhya Pradesh", name: "Rote Siddharth Ravindra", block: "Sondwa", gPs: "Ojhad, Sakdi, Temla, Kukdiya, Khamat, Kulwat, Walpur, Kakrana", ngo: "TRIF, Educate Girls", year: "N/A", remarks: "N/A" },
  { deployment: "Madhya Pradesh", name: "Krishna Madhhasiya", block: "Petlawad", gPs: "Gangakhedi, Mathmath, Ghughri, Karwad, Mandan, Gunawad", ngo: "TRIF, Vagdhara", year: "TRIF - 2018, Vagdhara -2024", remarks: "N/A" },
  { deployment: "Madhya Pradesh", name: "Rinkesh Sahu", block: "Sailana", gPs: "Shivgarh, Sundi, Bawdi, Kelda, Binti", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Madhya Pradesh", name: "AMAN KOUSHIK", block: "Balaghat", gPs: "Kosami, Bagadara, Gongalai, Neveganv, Chichaganv, Naitara", ngo: "PRADAN", year: "N/A", remarks: "N/A" },
  { deployment: "Madhya Pradesh", name: "AMAN TYAGI", block: "Karahal", gPs: "Partwada, Piprani, Chitara, Panwada, Bargawan, Silpuri, Ajapura, Lalitpura", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Madhya Pradesh", name: "PATHAN AWEJKHA ILIYASKHA", block: "Burhanpur", gPs: "Dongargaon, Badziri, Bodarli, Badsingi Jasondi", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Madhya Pradesh", name: "ANAND SHAKYA", block: "Tamia", gPs: "Dhagariya, Ghatlinga, Doriyakheda, Jamundonga, Khursidhana, Delakhari, Khapakhurd", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Madhya Pradesh", name: "HEERA LAL JAISWAL", block: "Pusprajgarh (ABP)", gPs: "Dhirutola, Bendi, Jelam, Girarikalan, Lakharo", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Madhya Pradesh", name: "DHARMENDRA SINGH THAKUR", block: "Tendukheda (ABP)", gPs: "Tejgarh, Sailwadamal, Samdai, Sanga, Bagdari, Tendukheda", ngo: "Piramal Foundation", year: "N/A", remarks: "N/A" },
  { deployment: "Madhya Pradesh", name: "Vikrant Lowanshi", block: "Rajpur", gPs: "Julvania, Panva, Nihali, Thakli, Rui", ngo: "Aga Khan Foundation, TRIF Foundation, Piramal Foundation", year: "N/A", remarks: "Piramal Foundation is working in many villages of my block on PRIs but they don't have any initiative in my Cluster GPs yet." },
  { deployment: "Maharashtra", name: "Nikhil Harishchandra Gore", block: "Desaiganj", gPs: "Tulashi, Kondhala, Kurud, Kinhala, Shivrajpur", ngo: "SEARCH, Piramal Foundation, Srushti Foundation", year: "SEARCH(2010), PIRAMAL Foundation(2022), Srushti(2023)", remarks: "N/A" },
  { deployment: "Maharashtra", name: "Bedre Vishal Rustumrao", block: "Nasik", gPs: "Pimpri Saiyyad, Lakhalgaon, Odha, Shilapur, Kotamgaon", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Maharashtra", name: "Swapnil Ravasaheb Mane", block: "Dhule", gPs: "Sanjori, Kundane War, Anand Khede", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Maharashtra", name: "Wadmare Swapna Vinayak", block: "Nagar", gPs: "Chas, Pimpalgaon Kauda, Kamargaon, Akolner, Bhorwadi", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Maharashtra", name: "KUMATKAR PRITAM RAMDAS", block: "Shirur", gPs: "Pabal, Kendur, Dhamari", ngo: "Vigyan Ashram, Maher Ashram", year: "1983, 2002", remarks: "N/A" },
  { deployment: "Maharashtra", name: "Ingle Aditya Balurao", block: "Amravati", gPs: "Pusada, Nandura Bk, Tembha, Gopalpur, Rohankheda", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Maharashtra", name: "Bhuyar Nikhil Dnyaneshwar", block: "Kagal", gPs: "Kasaba Sangaon, Mauje Sangaon, Pimpalgaon Kh, Vhannur, Karnur", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Maharashtra", name: "GAIKWAD NIKITA CHANDRAHAR", block: "Akkalkot (ABP Block)", gPs: "Mangrul, Tadwal, Mhaisalage", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Maharashtra", name: "ASIYA ZAKIR SAYYAD", block: "Talasari (ABP Block)", gPs: "Borigaon, Vasa, Vevaji", ngo: "1.Sadhguru Seva Pratisthan 2.Yashraj Research Foundation 3. Rushabh Foundation 4. Lupin Foundation 5. Piramal foundation 6. Roshni Foundation 7.Lions club Bordi", year: "2023,2024", remarks: "NGOs work in various sectors such as education, health, solid waste management, and Green village development. The Piramal Foundation specifically focuses on improving Aashram School in a single Gram Panchayat (GP) – Zai Borigaon." },
  { deployment: "Maharashtra", name: "GAYAKWAD SHYAM VASANTRAO", block: "Lohara", gPs: "Wadgaonwadi, Malegaon, Lohara (Kd), Bendkal,", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Maharashtra", name: "Shubham Rajkumar Gajbhiye", block: "Chandrapur", gPs: "Tadali, Kosara, Morva, Vichoda Rai, Sakharwahi", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Manipur", name: "PUKHRAMBAM BUDHACHANDRA SINGH", block: "Wangjing CD Block", gPs: "Tentha, Sapam, Tekcham, Samaram", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Manipur", name: "REZIA NAMEIRAKPAM", block: "Nambol", gPs: "Leimapokpam, Keinou, Ishok", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Manipur", name: "Themshingphi Konghay", block: "Sawombung CD Block", gPs: "Waiton, Khundrakpam, Haraorou Tangkham, Sawombung", ngo: "Moringa for life", year: "1998", remarks: "N/A" },
  { deployment: "Meghalaya", name: "BINOD KHANAL", block: "Mairang", gPs: "Mawkarah Nongkdait, Mawkarah Nongpyndiang, Mawkarah Nongwahre, Mawkarah Mawpni", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Mizoram", name: "Talluri Saadhu", block: "East Lungdar", gPs: "E. Lungdar, Leng, Sailulak, N. Mualcheng, Chekawn, Khawlailung, Piler", ngo: "Young Mizo Association(YMA), Mizo Hmeichhe Insuihkhawm Pawl (MHIP)", year: "1935,1974", remarks: "N/A" },
  { deployment: "Mizoram", name: "Pagutla Venkateswara Rao", block: "Lunglei", gPs: "Haulawng, Mausen, Zotuitlang, Sekhum, N. Mualthuam, Ramlaitui, Pukpui", ngo: "Young Mizo Association(YMA), Mizo Hmeichhe Insuihkhawm Pawl (MHIP)", year: "1935,1974", remarks: "N/A" },
  { deployment: "Odisha", name: "Mallekedi Sharath Chandra Prasad", block: "Phulbani Block", gPs: "Keredi, Minia, Bisipada", ngo: "PRADAN NGO", year: "2022", remarks: "Working for improving agriculture especially in tribal areas. It is active since 2022." },
  { deployment: "Odisha", name: "SHREETAM KALTA", block: "Nuapada Block", gPs: "Ansena, Saipala, Darlimunda", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Odisha", name: "SANJIBANI MAJHI", block: "Keonjhar", gPs: "Sirispal, Dimbo, Padmapur", ngo: "TATA Steel Trust", year: "2024", remarks: "N/A" },
  { deployment: "Odisha", name: "RANJAN SABAT", block: "Sadar", gPs: "Kinjira, Bhasma", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Punjab", name: "KUMAR SHUBAM", block: "Sultanpur Lodhi (ABP Block)", gPs: "Ahmedpur, Alladitta, Kamalpur, Latianwala, Mahablipur, Nasirewal, Sech, Toti", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Rajasthan", name: "Shivani Rao", block: "Bari", gPs: "Ajeetpura, Aligarh, Bahadurpur", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Rajasthan", name: "Devesh Lawaniya", block: "Aspur", gPs: "Amaratiya, Aspur, Badliya", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Sikkim", name: "RATAN RAJ", block: "Dentam", gPs: "Sangkhu Radukhandu, Dentam, Hee", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Tamil Nadu", name: "Randhir P", block: "Aruppukottai", gPs: "Palavanatham, Kullorsandhai, Soolakkarai, T.Meenatchipuram", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Tamil Nadu", name: "Ranjithkumar A", block: "Ramanathapuram", gPs: "Peravoor, Chitharkottai, Athiyuthu, Peruvayal", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Tamil Nadu", name: "SHYAMJITH T", block: "Melur", gPs: "Vellalur, Poonjuthi, Thiruvathavur", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Telangana", name: "VIDYANIDHI SARASWATHI", block: "Khammam (Urban)", gPs: "Raghunadha Palem, V Venkatayapalem, Chinthagurthi, Vepakuntla, Koyachalka, Regula Chalka", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Telangana", name: "NIMMALA SHEKHAR", block: "Geesugonda", gPs: "Geesugonda, Konaimakula, Rampur, MARIAPURAM, Gangadevipalli, Ookal", ngo: "N/A", year: "N/A", remarks: "N/A" },
  
  { deployment: "Telangana", name: "NIDHI SINGH", block: "Kadthal", gPs: "Kadthal", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Telangana", name: "CHELIKANI PADMALATHA", block: "Aswapuram", gPs: "Aswapuram", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Telangana", name: "THALLOORI PAVAN KUMAR", block: "Lecja", gPs: "Medikonda, Pullikal, Kesavapuram, Venisampur", ngo: "Mamidipudi Venkatarangaiya Foundation", year: "1981", remarks: "Aims to eliminate child labor by ensuring all children access quality education" },
  { deployment: "Telangana", name: "BAIAH MAHESH", block: "Gudur", gPs: "Bhupathipet, Gudur, Ponugodu, Ayodhyapur, Bollepalle, Naikpally", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Telangana", name: "DHARMARAPU MAHESH", block: "Narayanapet", gPs: "Perapalla, Shernapally, Singaram", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Uttar Pradesh", name: "Sourabh Shukla", block: "Chopan", gPs: "Adalganj, Aghorikhas, Barganwa, Chatarwar, Gauradeeh, Kargara, Kuracha", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Uttar Pradesh", name: "Amalraj Anjani Kumar Dubey", block: "Balrampur", gPs: "Belwa Balui, Paigapur, Rowari, Bhagwanpur", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Uttar Pradesh", name: "Poonam Khatri", block: "Bahua", gPs: "Gazipur, Chakaitailly, Babara", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Uttar Pradesh", name: "Ravikant Yadav", block: "Bhathat", gPs: "Budhadeeh, Islampur, Hafiznagar, Jamuniya, Rampur Khurd, Rampur Bujurg", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Uttar Pradesh", name: "Shivraj", block: "Sevapuri", gPs: "Baradeeh, Gairaha, Haribhanpur, Bazar kalika, Isarwar, Udraha", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Uttar Pradesh", name: "KAJAL YADAV", block: "Chakiya", gPs: "Muzzafarpur, Bhamura, Raghunathpur, Bhatwara Kala", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Uttar Pradesh", name: "FIROZ KHAN", block: "Chitaura", gPs: "Aminpur Nagaraur, Ashoka, Deeha, Itaunjha, Susrauli", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Uttar Pradesh", name: "VIVEK MISHRA", block: "Karwi", gPs: "Khohi, Chitra Gokulpur, Chapramafi, Bhaganpur, Sangrampur", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Uttar Pradesh", name: "Vipul Ratnesh", block: "Mithaura (ABP Block)", gPs: "Baunia Raja, Arnahavan, Paneva Panei", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Uttarakhand", name: "PRABHANJAN KUMAR", block: "Augustmuni", gPs: "Ratura, Sumerpur, Shivanindi, Gadora, Maroda, Nagrashu, Beena", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "Uttarakhand", name: "NITESH KANDWAL", block: "Dunda", gPs: "Gainvla (Bharsali), Baun, Panjiyala, Matli, Khattukhal, Juguldi", ngo: "Himmotthan Society", year: "2007", remarks: "N/A" },
  { deployment: "West Bengal", name: "Krishna Gopal Mukherjee", block: "Rajganj", gPs: "Majhiali", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "West Bengal", name: "ANAMIKA DUTTA", block: "Garbeta-III", gPs: "Amsole", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "West Bengal", name: "SUKANYA DATTA", block: "Chandipur", gPs: "Brindabanpur-1", ngo: "N/A", year: "N/A", remarks: "N/A" },
  { deployment: "West Bengal", name: "PRADIPTA BARMAN", block: "Behrampore", gPs: "Madanpur", ngo: "CINI", year: "2005", remarks: "N/A" }
];
    
    return (
      <div className="p-6 bg-gray-50">
        <div className="text-center mb-12">
          <h1 className="text-[#004B86] text-[2.5rem] font-extrabold">
            NGO's Associated with the Project GP's
          </h1>
          <p className="text-gray-600 mt-2 text-lg leading-relaxed">
            Working together to empower the Gram Panchayats
          </p>
        </div>
        <table style={{ width: '100%', border: '1px solid black' }}>
          <thead>
            <tr style={{ borderBottom: '3px solid black', background: 'aliceblue', fontWeight: 'bold' }}>
              <th>Sl.No.</th> {/* Added column for numbering */}
              <th>State</th>
              <th>Name of the Young Fellow (YF)</th>
              <th>Block Where the Cluster is Located</th>
              <th>Names of GPs</th>
              <th>Name of NGO</th>
              <th>Operating since YEAR</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td style={{ padding: '10px', border: 'solid 1px gray' }}>{index + 1}</td> {/* Automatic numbering */}
                <td style={{ padding: '10px', border: 'solid 1px gray' }}>{item.deployment}</td>
                <td style={{ padding: '10px', border: 'solid 1px gray' }}>{item.name}</td>
                <td style={{ padding: '10px', border: 'solid 1px gray' }}>{item.block}</td>
                <td style={{ padding: '10px', border: 'solid 1px gray' }}>{item.gPs}</td>
                <td style={{ padding: '10px', border: 'solid 1px gray' }}>{item.ngo}</td>
                <td style={{ padding: '10px', border: 'solid 1px gray' }}>{item.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default NGODetailsPage;