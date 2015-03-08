class Project < ActiveRecord::Base
  def self.states(playmates)
    states = { 
      'AL'=> 0, 'AK'=> 0, 'AZ'=> 0, 'AR'=> 0, 'CA'=> 0, 'CO'=> 0, 'CT'=> 0, 'DE'=> 0, 'FL'=> 0, 'GA'=> 0,
      'HI'=> 0, 'ID'=> 0, 'IL'=> 0, 'IN'=> 0, 'IA'=> 0, 'KS'=> 0, 'KY'=> 0, 'LA'=> 0, 'ME'=> 0, 'MD'=> 0,
      'MA'=> 0, 'MI'=> 0, 'MN'=> 0, 'MS'=> 0, 'MO'=> 0, 'MT'=> 0, 'NE'=> 0, 'NV'=> 0, 'NH'=> 0, 'NJ'=> 0,
      'NM'=> 0, 'NY'=> 0, 'NC'=> 0, 'ND'=> 0, 'OH'=> 0, 'OK'=> 0, 'OR'=> 0, 'PA'=> 0, 'RI'=> 0, 'SC'=> 0,
      'SD'=> 0, 'TN'=> 0, 'TX'=> 0, 'UT'=> 0, 'VT'=> 0, 'VA'=> 0, 'WA'=> 0, 'WV'=> 0, 'WI'=> 0, 'WY'=> 0,
      'DC'=> 0, 'GU'=> 0, 'PW'=> 0, 'PR'=> 0, 'VI'=> 0
    }
    stateList = []
    playmates.each do |playmate|
      if playmate['birthplace']
        if playmate['birthplace']['state'].length > 2
          state = Project.stateKeys(playmate['birthplace']['state'].downcase)
        else
          state = playmate['birthplace']['state']
        end
        states[state] += 1 if states[state]
      end
    end
    states.each do |key, value|
      new_value = (300 - value) / 2 * 9
      stateList << { name: key, num: value, fillValue: new_value }
    end
    stateList
  end

  def self.hair_colors(playmates)
    colors = Hash.new 0
    playmates.each do |p|
      colors[p['haircolor']] += 1
    end
    colors
  end

  def self.stateKeys(state)
    keys = 
    { 
    'alabama' => :AL,
    'alaska' => :AK,
    'arizona' => :AZ,
    'arkansas' => :AR,
    'california' => :CA,
    'colorado' => :CO,
    'connecticut' => :CT,
    'delaware' => :DE,
    'florida' => :FL,
    'georgia' => :GA,
    'hawaii' => :HI,
    'idaho' => :ID,
    'illinois' => :IL,
    'indian' => :IN,
    'iowa' => :IA,
    'kansas' => :KS,
    'kentucky' => :KY,
    'louisiana' => :LA,
    'maine' => :ME,
    'maryland' => :MD,
    'massachusetts' => :MA,
    'michigan' => :MI,
    'minnesota' => :MN,
    'mississippi' => :MS,
    'missouri' => :MO,
    'montana' => :MT,
    'nebraska' => :NE,
    'nevada' => :NV,
    'new hampshire' => :NH,
    'new jersey' => :NJ,
    'new mexico' => :NM,
    'new york' => :NY,
    'north carolina' => :NC,
    'North dakota' => :ND,
    'ohio' => :OH,
    'oklahoma' => :OK,
    'oregon' => :OR,
    'pennsylvania' => :PA,
    'rhode island' => :RI,
    'south carolina' => :SC,
    'south dakota' => :SD,
    'tennessee' => :TN,
    'texas' => :TX,
    'utah' => :UT,
    'vermont' => :VT,
    'virginia' => :VA,
    'washington' => :WA,
    'west virginia' => :WV,
    'wisconsin' => :WI,
    'wyoming' => :WY,
    'Dcistrict of columbia' => :DC,
    'guam' => :GU,
    'palau' => :PW,
    'puerto rico' => :PR,
    'virgin islands' =>:'V'
    }
    keys[state].to_s
  end
end
