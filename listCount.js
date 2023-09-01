const list = [
	{ lang: 'nodejs' },
	{ lang: 'golang' },
	{ lang: 'php' },
	{ lang: 'nodejs' },
	{ lang: 'php' },
	{ lang: 'php'},
]

// empty languageCount object is declare
const languageCounts={};

// for every object in the list it will the conditions below with increment or create a new key-value pair
for (const item of list) {
    const { lang } = item;
    if (languageCounts[lang]) {
      languageCounts[lang]++;
    } else {
      languageCounts[lang] = 1;
    }
  }
  
console.log(languageCounts);
console.log(list)