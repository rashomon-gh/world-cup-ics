export interface Match {
  grp: string;
  utc: number;
  date: string; // 'YYYY-MM-DD' UTC date
  teams: string;
  venue: string;
  num?: string; // knockout match number
}

// Group stage matches (72 matches, Groups A-L)
export const GROUP_MATCHES: Match[] = [
  // Group A
  { grp:'A', utc:19,   date:'2026-06-11', teams:'Mexico v South Africa',       venue:'Mexico City'   },
  { grp:'A', utc:2,    date:'2026-06-12', teams:'South Korea v Czechia',       venue:'Guadalajara'   },
  { grp:'A', utc:16,   date:'2026-06-18', teams:'Czechia v South Africa',      venue:'Atlanta'       },
  { grp:'A', utc:1,    date:'2026-06-19', teams:'Mexico v South Korea',        venue:'Guadalajara'   },
  { grp:'A', utc:1,    date:'2026-06-25', teams:'Czechia v Mexico',            venue:'Mexico City'   },
  { grp:'A', utc:1,    date:'2026-06-25', teams:'South Africa v South Korea',  venue:'Monterrey'     },
  // Group B
  { grp:'B', utc:19,   date:'2026-06-12', teams:'Canada v Bosnia & Herz.',     venue:'Toronto'       },
  { grp:'B', utc:19,   date:'2026-06-13', teams:'Qatar v Switzerland',         venue:'San Francisco' },
  { grp:'B', utc:19,   date:'2026-06-18', teams:'Switzerland v Bosnia',        venue:'Los Angeles'   },
  { grp:'B', utc:22,   date:'2026-06-18', teams:'Canada v Qatar',              venue:'Vancouver'     },
  { grp:'B', utc:19,   date:'2026-06-24', teams:'Switzerland v Canada',        venue:'Vancouver'     },
  { grp:'B', utc:19,   date:'2026-06-24', teams:'Bosnia v Qatar',              venue:'Seattle'       },
  // Group C
  { grp:'C', utc:22,   date:'2026-06-13', teams:'Brazil v Morocco',            venue:'New York/NJ'   },
  { grp:'C', utc:1,    date:'2026-06-14', teams:'Haiti v Scotland',            venue:'Boston'        },
  { grp:'C', utc:22,   date:'2026-06-19', teams:'Scotland v Morocco',          venue:'Boston'        },
  { grp:'C', utc:0.5,  date:'2026-06-20', teams:'Brazil v Haiti',              venue:'Philadelphia'  },
  { grp:'C', utc:22,   date:'2026-06-24', teams:'Scotland v Brazil',           venue:'Miami'         },
  { grp:'C', utc:22,   date:'2026-06-24', teams:'Morocco v Haiti',             venue:'Atlanta'       },
  // Group D
  { grp:'D', utc:1,    date:'2026-06-13', teams:'USA v Paraguay',              venue:'Los Angeles'   },
  { grp:'D', utc:4,    date:'2026-06-14', teams:'Australia v Turkiye',         venue:'Vancouver'     },
  { grp:'D', utc:19,   date:'2026-06-19', teams:'USA v Australia',             venue:'Seattle'       },
  { grp:'D', utc:3,    date:'2026-06-20', teams:'Turkiye v Paraguay',          venue:'San Francisco' },
  { grp:'D', utc:2,    date:'2026-06-26', teams:'Turkiye v USA',               venue:'Los Angeles'   },
  { grp:'D', utc:2,    date:'2026-06-26', teams:'Paraguay v Australia',        venue:'San Francisco' },
  // Group E
  { grp:'E', utc:17,   date:'2026-06-14', teams:'Germany v Curacao',           venue:'Houston'       },
  { grp:'E', utc:23,   date:'2026-06-14', teams:'Ivory Coast v Ecuador',       venue:'Philadelphia'  },
  { grp:'E', utc:20,   date:'2026-06-20', teams:'Germany v Ivory Coast',       venue:'Toronto'       },
  { grp:'E', utc:0,    date:'2026-06-21', teams:'Ecuador v Curacao',           venue:'Kansas City'   },
  { grp:'E', utc:20,   date:'2026-06-25', teams:'Curacao v Ivory Coast',       venue:'Philadelphia'  },
  { grp:'E', utc:20,   date:'2026-06-25', teams:'Ecuador v Germany',           venue:'New York/NJ'   },
  // Group F
  { grp:'F', utc:20,   date:'2026-06-14', teams:'Netherlands v Japan',         venue:'Dallas'        },
  { grp:'F', utc:2,    date:'2026-06-15', teams:'Sweden v Tunisia',            venue:'Monterrey'     },
  { grp:'F', utc:17,   date:'2026-06-20', teams:'Netherlands v Sweden',        venue:'Houston'       },
  { grp:'F', utc:4,    date:'2026-06-21', teams:'Tunisia v Japan',             venue:'Monterrey'     },
  { grp:'F', utc:23,   date:'2026-06-25', teams:'Japan v Sweden',              venue:'Dallas'        },
  { grp:'F', utc:23,   date:'2026-06-25', teams:'Tunisia v Netherlands',       venue:'Kansas City'   },
  // Group G
  { grp:'G', utc:19,   date:'2026-06-15', teams:'Belgium v Egypt',             venue:'Seattle'       },
  { grp:'G', utc:1,    date:'2026-06-16', teams:'Iran v New Zealand',          venue:'Los Angeles'   },
  { grp:'G', utc:19,   date:'2026-06-21', teams:'Belgium v Iran',              venue:'Los Angeles'   },
  { grp:'G', utc:1,    date:'2026-06-22', teams:'New Zealand v Egypt',         venue:'Vancouver'     },
  { grp:'G', utc:3,    date:'2026-06-27', teams:'Egypt v Iran',                venue:'Seattle'       },
  { grp:'G', utc:3,    date:'2026-06-27', teams:'New Zealand v Belgium',       venue:'Vancouver'     },
  // Group H
  { grp:'H', utc:16,   date:'2026-06-15', teams:'Spain v Cape Verde',          venue:'Atlanta'       },
  { grp:'H', utc:22,   date:'2026-06-15', teams:'Saudi Arabia v Uruguay',      venue:'Miami'         },
  { grp:'H', utc:16,   date:'2026-06-21', teams:'Spain v Saudi Arabia',        venue:'Atlanta'       },
  { grp:'H', utc:22,   date:'2026-06-21', teams:'Uruguay v Cape Verde',        venue:'Miami'         },
  { grp:'H', utc:0,    date:'2026-06-27', teams:'Cape Verde v Saudi Arabia',   venue:'Houston'       },
  { grp:'H', utc:0,    date:'2026-06-27', teams:'Uruguay v Spain',             venue:'Guadalajara'   },
  // Group I
  { grp:'I', utc:19,   date:'2026-06-16', teams:'France v Senegal',            venue:'New York/NJ'   },
  { grp:'I', utc:22,   date:'2026-06-16', teams:'Iraq v Norway',               venue:'Boston'        },
  { grp:'I', utc:21,   date:'2026-06-22', teams:'France v Iraq',               venue:'Philadelphia'  },
  { grp:'I', utc:0,    date:'2026-06-23', teams:'Norway v Senegal',            venue:'New York/NJ'   },
  { grp:'I', utc:19,   date:'2026-06-26', teams:'Norway v France',             venue:'Boston'        },
  { grp:'I', utc:19,   date:'2026-06-26', teams:'Senegal v Iraq',              venue:'Toronto'       },
  // Group J
  { grp:'J', utc:1,    date:'2026-06-17', teams:'Argentina v Algeria',         venue:'Kansas City'   },
  { grp:'J', utc:4,    date:'2026-06-17', teams:'Austria v Jordan',            venue:'San Francisco' },
  { grp:'J', utc:17,   date:'2026-06-22', teams:'Argentina v Austria',         venue:'Dallas'        },
  { grp:'J', utc:3,    date:'2026-06-23', teams:'Jordan v Algeria',            venue:'San Francisco' },
  { grp:'J', utc:2,    date:'2026-06-28', teams:'Jordan v Argentina',          venue:'Dallas'        },
  { grp:'J', utc:2,    date:'2026-06-28', teams:'Algeria v Austria',           venue:'Kansas City'   },
  // Group K
  { grp:'K', utc:17,   date:'2026-06-17', teams:'Portugal v Congo DR',         venue:'Houston'       },
  { grp:'K', utc:2,    date:'2026-06-18', teams:'Uzbekistan v Colombia',       venue:'Mexico City'   },
  { grp:'K', utc:17,   date:'2026-06-23', teams:'Portugal v Uzbekistan',       venue:'Houston'       },
  { grp:'K', utc:2,    date:'2026-06-24', teams:'Colombia v Congo DR',         venue:'Guadalajara'   },
  { grp:'K', utc:23.5, date:'2026-06-27', teams:'Colombia v Portugal',         venue:'Miami'         },
  { grp:'K', utc:23.5, date:'2026-06-27', teams:'Congo DR v Uzbekistan',       venue:'Atlanta'       },
  // Group L
  { grp:'L', utc:20,   date:'2026-06-17', teams:'England v Croatia',           venue:'Dallas'        },
  { grp:'L', utc:23,   date:'2026-06-17', teams:'Ghana v Panama',              venue:'Toronto'       },
  { grp:'L', utc:20,   date:'2026-06-23', teams:'England v Ghana',             venue:'Boston'        },
  { grp:'L', utc:23,   date:'2026-06-23', teams:'Panama v Croatia',            venue:'Toronto'       },
  { grp:'L', utc:21,   date:'2026-06-27', teams:'Panama v England',            venue:'New York/NJ'   },
  { grp:'L', utc:21,   date:'2026-06-27', teams:'Croatia v Ghana',             venue:'Philadelphia'  },
];

export const KNOCKOUT_MATCHES: Match[] = [
  // Round of 32
  { grp:'R32', num:'M73', utc:19,   date:'2026-06-28', teams:'South Africa v Canada',      venue:'Los Angeles'   },
  { grp:'R32', num:'M76', utc:17,   date:'2026-06-29', teams:'Brazil v Japan',             venue:'Houston'       },
  { grp:'R32', num:'M74', utc:20.5, date:'2026-06-29', teams:'Germany v Paraguay',         venue:'Boston'        },
  { grp:'R32', num:'M75', utc:1,    date:'2026-06-30', teams:'Netherlands v Morocco',      venue:'Monterrey'     },
  { grp:'R32', num:'M78', utc:17,   date:'2026-06-30', teams:'Ivory Coast v Norway',       venue:'Dallas'        },
  { grp:'R32', num:'M77', utc:21,   date:'2026-06-30', teams:'France v Sweden',            venue:'New York/NJ'   },
  { grp:'R32', num:'M79', utc:1,    date:'2026-07-01', teams:'Mexico v Ecuador',           venue:'Mexico City'   },
  { grp:'R32', num:'M80', utc:16,   date:'2026-07-01', teams:'England v Congo DR',         venue:'Atlanta'       },
  { grp:'R32', num:'M82', utc:20,   date:'2026-07-01', teams:'Belgium v Senegal',          venue:'Seattle'       },
  { grp:'R32', num:'M81', utc:0,    date:'2026-07-02', teams:'USA v Bosnia & Herz.',       venue:'San Francisco' },
  { grp:'R32', num:'M84', utc:19,   date:'2026-07-02', teams:'Spain v Austria',            venue:'Los Angeles'   },
  { grp:'R32', num:'M83', utc:23,   date:'2026-07-02', teams:'Portugal v Croatia',         venue:'Toronto'       },
  { grp:'R32', num:'M85', utc:3,    date:'2026-07-03', teams:'Switzerland v Algeria',      venue:'Vancouver'     },
  { grp:'R32', num:'M88', utc:18,   date:'2026-07-03', teams:'Australia v Egypt',          venue:'Dallas'        },
  { grp:'R32', num:'M86', utc:22,   date:'2026-07-03', teams:'Argentina v Cape Verde',     venue:'Miami'         },
  { grp:'R32', num:'M87', utc:1.5,  date:'2026-07-04', teams:'Colombia v Ghana',           venue:'Kansas City'   },
  // Round of 16
  { grp:'R16', num:'M89', utc:17,   date:'2026-07-04', teams:'Paraguay v France',        venue:'Philadelphia'  },
  { grp:'R16', num:'M90', utc:21,   date:'2026-07-04', teams:'Canada v Morocco',         venue:'Houston'       },
  { grp:'R16', num:'M91', utc:20,   date:'2026-07-05', teams:'Brazil v Norway',           venue:'New York/NJ'   },
  { grp:'R16', num:'M92', utc:0,    date:'2026-07-06', teams:'Mexico v England',         venue:'Mexico City'   },
  { grp:'R16', num:'M93', utc:19,   date:'2026-07-06', teams:'Portugal v Spain',         venue:'Dallas'        },
  { grp:'R16', num:'M94', utc:0,    date:'2026-07-07', teams:'USA v Belgium',            venue:'Seattle'       },
  { grp:'R16', num:'M95', utc:16,   date:'2026-07-07', teams:'Argentina v Egypt',       venue:'Atlanta'       },
  { grp:'R16', num:'M96', utc:20,   date:'2026-07-07', teams:'Switzerland v Colombia',  venue:'Vancouver'     },
  // Quarter-finals
  { grp:'QF',  num:'M97', utc:20,   date:'2026-07-09', teams:'France v Morocco',        venue:'Boston'        },
  { grp:'QF',  num:'M98', utc:19,   date:'2026-07-10', teams:'Spain v Belgium',         venue:'Los Angeles'   },
  { grp:'QF',  num:'M99', utc:21,   date:'2026-07-11', teams:'Norway v England',        venue:'Miami'         },
  { grp:'QF',  num:'M100',utc:1,    date:'2026-07-12', teams:'Argentina v Switzerland', venue:'Kansas City'   },
  // Semi-finals
  { grp:'SF',  num:'M101',utc:19,   date:'2026-07-14', teams:'Win M97 v Win M98',       venue:'Dallas'        },
  { grp:'SF',  num:'M102',utc:19,   date:'2026-07-15', teams:'Win M99 v Win M100',      venue:'Atlanta'       },
  // Third place + Final
  { grp:'3rd', num:'M103',utc:21,   date:'2026-07-18', teams:'3rd Place Play-off',       venue:'Miami'         },
  { grp:'F',   num:'M104',utc:19,   date:'2026-07-19', teams:'FINAL',                    venue:'New York/NJ'   },
];

export const ALL_MATCHES: Match[] = [...GROUP_MATCHES, ...KNOCKOUT_MATCHES];

export function matchToDate(match: Match): Date {
  const [y, m, d] = match.date.split('-').map(Number);
  const hours = Math.floor(match.utc);
  const minutes = Math.round((match.utc - hours) * 60);
  return new Date(Date.UTC(y, m - 1, d, hours, minutes, 0));
}

export const FLAGS: Record<string, string> = {
  'Algeria':'dz','Argentina':'ar','Australia':'au','Austria':'at',
  'Belgium':'be','Bosnia':'ba','Bosnia & Herz.':'ba','Brazil':'br',
  'Canada':'ca','Cape Verde':'cv','Colombia':'co','Congo DR':'cd',
  'Croatia':'hr','Curacao':'cw','Czechia':'cz','Ecuador':'ec',
  'Egypt':'eg','England':'gb-eng','France':'fr','Germany':'de',
  'Ghana':'gh','Haiti':'ht','Iran':'ir','Iraq':'iq',
  'Ivory Coast':'ci','Japan':'jp','Jordan':'jo','Mexico':'mx',
  'Morocco':'ma','Netherlands':'nl','New Zealand':'nz','Norway':'no',
  'Panama':'pa','Paraguay':'py','Portugal':'pt','Qatar':'qa',
  'Saudi Arabia':'sa','Scotland':'gb-sct','Senegal':'sn',
  'South Africa':'za','South Korea':'kr','Spain':'es','Sweden':'se',
  'Switzerland':'ch','Tunisia':'tn','Turkiye':'tr','Uruguay':'uy',
  'USA':'us','Uzbekistan':'uz',
};

export const GROUP_STAGE_TEAMS: string[] = [
  'Algeria','Argentina','Australia','Austria','Belgium','Bosnia & Herz.',
  'Brazil','Canada','Cape Verde','Colombia','Congo DR','Croatia','Curacao',
  'Czechia','Ecuador','Egypt','England','France','Germany','Ghana','Haiti',
  'Iran','Iraq','Ivory Coast','Japan','Jordan','Mexico','Morocco',
  'Netherlands','New Zealand','Norway','Panama','Paraguay','Portugal',
  'Qatar','Saudi Arabia','Scotland','Senegal','South Africa','South Korea',
  'Spain','Sweden','Switzerland','Tunisia','Turkiye','Uruguay','USA','Uzbekistan',
];

export const GROUPS: Record<string, string[]> = {
  'A': ['Mexico','South Korea','Czechia','South Africa'],
  'B': ['Canada','Bosnia & Herz.','Qatar','Switzerland'],
  'C': ['Brazil','Morocco','Haiti','Scotland'],
  'D': ['USA','Paraguay','Australia','Turkiye'],
  'E': ['Germany','Curacao','Ivory Coast','Ecuador'],
  'F': ['Netherlands','Japan','Sweden','Tunisia'],
  'G': ['Belgium','Egypt','Iran','New Zealand'],
  'H': ['Spain','Cape Verde','Saudi Arabia','Uruguay'],
  'I': ['France','Senegal','Iraq','Norway'],
  'J': ['Argentina','Algeria','Austria','Jordan'],
  'K': ['Portugal','Congo DR','Uzbekistan','Colombia'],
  'L': ['England','Croatia','Ghana','Panama'],
};
