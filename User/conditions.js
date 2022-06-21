// list of conditions
// label: '', e.g. depression
// type: ['mental','social','physical','behavioural']
// duration: ['temporary','permanent','chronic'] // temporary can only get better, permanent can only get worse, chronic cannot be deleted
// severity: 0 - 1 // 0 - 0.3 light, 0.3 - 0.6 mild, 0.6 - 1 sever
// coding: [ // optional, array of descriptions of conditions in coding system(s)
//  {
//    system: "https://loinc.org",
//    display: "Diabetes mellitus"
//    code: "45636-8"
//  }
// ]
// progression: {
//      scale: a time scale, e.g. 'day' 'month' ,
//      rate: 0 to 1, // probability of weight increment
//      weight: -1 to 1, // gets more or less severe and how much over time
// }

const CONDITIONS = [
    { label:'depression', type: 'mental', duration:'chronic', severity:0.5, rate:0.05, progression: {
            scale: 'day',
            rate: 0.2,
            weight: 0.2,
        }
    },
    { label:'paranoia', type: 'mental', duration:'chronic', severity:0.5, rate:0.01, progression: {
            scale: 'day',
            rate: 0.2,
            weight: 0.2,
        }
    },
    { label:'diabetes', type: 'physical', duration:'chronic', severity:0.3, rate:0.05, progression: {
            scale: 'day',
            rate: 0.1,
            weight: 0.01,
        }
    },
    { label:'isolation', type: 'behavioural', duration:'temporary', severity:0.1, rate:0.01, progression: {
            scale: 'month',
            rate: 0.07,
            weight: 0.5,
        }
    },
    { label:'self-isolation', type: 'social', duration:'temporary', severity:0.1, rate:0.05, progression: {
            scale: 'month',
            rate: 0.1,
            weight: 0.05,
        }
    },
    { label:'loneliness', type: 'mental', duration:'temporary', severity:0.2, rate:0.1, progression: {
            scale: 'month',
            rate: 0.1,
            weight: 0.05,
        }
    },
    { label:'eat disorder', type: 'behavioural', duration:'chronic', severity:0.2, rate:0.1, progression: {
            scale: 'month',
            rate: 0.01,
            weight: 0.05,
        }
    },
    { label:'metabolic disorder', type: 'physical', duration:'chronic', severity:0.3, rate:0.1, progression: {
            scale: 'month',
            rate: 0.01,
            weight: 0.05,
        }
    },
    { label:'rheumatic diseases', type: 'physical', duration:'chronic', severity:0.5, rate:0.1, progression: {
            scale: 'month',
            rate: 0.01,
            weight: 0.05,
        }
    },
    { label:'exhaustion', type: 'mental', duration:'temporary', severity:0.1, rate:0.1, progression: {
            scale: 'day',
            rate: 0.01,
            weight: 0.05,
        }
    },
    { label:'cancer', type: 'physical', duration:'chronic', severity:0.8, rate:0.05, progression: {
            scale: 'month',
            rate: 0.3,
            weight: 0.5,
        }
    },
    { label:'heart disease', type: 'physical', duration:'chronic', severity:0.6, rate:0.05, progression: {
            scale: 'week',
            rate: 0.1,
            weight: 0.1,
        }
    },
    { label:'flu', type: 'physical', duration:'temporary', severity:0.4, rate:0.2, progression: {
            scale: 'day',
            rate: 0.1,
            weight: -0.1,
        }
    },
    { label:'injury', type: 'physical', duration:'temporary', severity:0.4, rate:0.1, progression: {
            scale: 'day',
            rate: 0.1,
            weight: -0.1,
        }
    },
    { label:'impairment', type: 'physical', duration:'permanent', severity:0.5, rate:0.05, progression: {
            scale: 'month',
            rate: 0.05,
            weight: 0.01,
        }
    },
    { label:'dementia', type: 'mental', duration:'permanent', severity:0.7, rate:0.005, progression: {
            scale: 'month',
            rate: 0.1,
            weight: 0.1,
        }
    },
    { label:'allergy', type: 'physical', duration:'chronic', severity:0.2,  rate:0.1, progression: {
            scale: 'month',
            rate: 0.01,
            weight: 0.1,
        }
    },
    { label:'poisoning', type: 'physical', duration:'temporary', severity:0.6, rate:0.05, progression: {
            scale: 'day',
            rate: 0.01,
            weight: -0.01,
        }
    },
    { label:'bleeding', type: 'physical', duration:'temporary', severity:0.3, rate:0.05, progression: {
            scale: 'day',
            rate: 0.01,
            weight: -0.4,
        }
    },
    {
        label: 'concussion', type: 'physical', duration: 'temporary', severity: 0.5, progression: {
            scale: 'day',
            rate: 0.8,
            weight: -0.1
        }
    },
    {
        label: 'breaking', type: 'physical', duration: 'temporary', severity: 0.5, progression: {
            scale: 'month',
            rate: 0.8,
            weight: -0.02,
        }
    }
];

export default CONDITIONS;