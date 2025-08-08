import { NextRequest, NextResponse } from 'next/server'

// Motta Puff specific roast templates - uniquely focused on egg puffs!
const roastTemplates = [
  {
    blesswin1: "Listen {name}, I've made 10,000 egg puffs and none were as empty as your {input}.",
    tom1: "Empty puffs! I made those yesterday! Wait, was I supposed to put eggs in them? {name}, do you have eggs inside?",
    blesswin2: "Tom, that's the POINT of egg puffs. {name}, you're like a puff without the puff - just disappointment wrapped in pastry.",
    tom2: "Disappointment pastry! Is that a new flavor? Can we sell that? {name}, are you for sale?"
  },
  {
    blesswin1: "Oh {name}, your {input} has less filling than Tom's 'special' egg puffs that he forgot to put eggs in.",
    tom1: "My eggless egg puffs! They were... puffy! Very puffy! Like air puffs! {name}, are you full of air?",
    blesswin2: "Tom, those weren't puffs, they were just sad pastry. {name}, you're like burnt puff pastry - crispy on the outside, hollow inside.",
    tom2: "Burnt pastry! I specialize in that! It's like... charcoal you can eat! {name}, are you edible charcoal?"
  },
  {
    blesswin1: "{name}, I've seen more personality in a day-old egg puff sitting under our heat lamp.",
    tom1: "Day-old puffs! I eat those for breakfast! And lunch! And sometimes dinner! {name}, what do you eat for dinner?",
    blesswin2: "Tom, that's why your stomach makes weird noises. {name}, you're like an overcooked egg puff - tough, chewy, and nobody wants seconds.",
    tom2: "Overcooked puffs! I make those every Tuesday! Or is it Wednesday? {name}, what day is it in your world?"
  },
  {
    blesswin1: "Dear {name}, your {input} is more cracked than the eggs Tom drops on the floor every morning.",
    tom1: "Floor eggs! I pick those up and use them anyway! Five-second rule! {name}, do you follow the five-second rule?",
    blesswin2: "Tom, that's not how food safety works. {name}, you're like a puff with a hole in it - all the good stuff leaks out.",
    tom2: "Leaky puffs! I try to patch them with more dough! Like puff bandages! {name}, do you need bandages?"
  },
  {
    blesswin1: "{name}, I'm more impressed by Tom's ability to burn water than by your {input}.",
    tom1: "I can burn water! It's a special talent! I also burn eggs, puffs, and sometimes the kitchen! {name}, can you burn things?",
    blesswin2: "Tom, you're a walking fire hazard. {name}, you're like a soggy egg puff - disappointing and impossible to fix.",
    tom2: "Soggy puffs! I made those in the rain once! They were like... wet bread with egg dreams! {name}, do you have egg dreams?"
  },
  {
    blesswin1: "Listen {name}, your personality has less spice than our mildest egg puff, and that's saying something.",
    tom1: "Mild puffs! I made those for babies! But babies don't eat puffs! Or do they? {name}, were you ever a baby?",
    blesswin2: "Everyone was a baby, Tom. {name}, you're like an egg puff made with expired eggs - technically still a puff, but why risk it?",
    tom2: "Expired eggs! I use those all the time! They're like... vintage eggs! {name}, are you vintage?"
  },
  {
    blesswin1: "Oh {name}, I've had more engaging conversations with our puff oven than with your {input}.",
    tom1: "The oven talks to me too! It says 'beep beep' and sometimes 'ding'! {name}, do you speak oven language?",
    blesswin2: "Tom, those are timer sounds. {name}, you're like a puff that got stuck in the oven - overdone and forgotten.",
    tom2: "Stuck puffs! I have to scrape those off with a spatula! {name}, do you need scraping?"
  },
  {
    blesswin1: "{name}, your {input} is more deflated than Tom's first attempt at making puff pastry.",
    tom1: "My first pastry! It was flat! Like a pancake! But crunchier! {name}, do you like crunchy pancakes?",
    blesswin2: "Tom, that wasn't pastry, that was a disaster. {name}, you're like a puff without yeast - flat and lifeless.",
    tom2: "Yeast! I forgot about yeast! Is that the magic powder? {name}, are you made of magic powder?"
  },
  {
    blesswin1: "Dear {name}, you have less substance than the steam coming out of our fresh egg puffs.",
    tom1: "Puff steam! I try to catch it sometimes! It's like... hot air that smells like eggs! {name}, do you smell like eggs?",
    blesswin2: "Tom, steam disappears, just like {name}'s relevance. You're like a cold egg puff - nobody wants you.",
    tom2: "Cold puffs! I reheat those in my armpits! Wait, is that sanitary? {name}, are you sanitary?"
  },
  {
    blesswin1: "{name}, I've seen more layers than an onion in our puff pastry, but your {input} is flatter than a roti.",
    tom1: "Flat roti! I make those when I forget to add the puff! They're like... sad circles! {name}, are you a sad circle?",
    blesswin2: "Tom, roti isn't supposed to puff. {name}, you're like an egg puff made with duck eggs - technically correct but completely wrong.",
    tom2: "Duck eggs! I used those once! The puffs quacked! Or was that me? {name}, do you quack?"
  },
  {
    blesswin1: "Listen {name}, your personality is more scrambled than the eggs Tom tries to put in our puffs.",
    tom1: "Scrambled eggs in puffs! That was innovative! Like... egg salad puffs! {name}, do you like salad?",
    blesswin2: "Tom, that's not how egg puffs work. {name}, you're like a puff made with eggshells - crunchy in all the wrong ways.",
    tom2: "Eggshell puffs! Extra calcium! I'm basically a health expert! {name}, are you healthy?"
  },
  {
    blesswin1: "Oh {name}, I've had more success selling day-old puffs than you've had with your {input}.",
    tom1: "Day-old puffs are vintage puffs! Like antique food! {name}, are you antique food?",
    blesswin2: "Tom, vintage food is called 'expired'. {name}, you're like a puff that fell on the floor - technically still a puff, but nobody's picking you up.",
    tom2: "Floor puffs! I eat those! Five-second rule becomes ten-second rule! {name}, what's your rule?"
  },
  {
    blesswin1: "{name}, your {input} has less golden color than our perfectly baked egg puffs, and more like Tom's burnt attempts.",
    tom1: "Burnt puffs! They're like... charcoal puffs! Very crunchy! Sometimes they spark! {name}, do you spark?",
    blesswin2: "Tom, food shouldn't spark. {name}, you're like a puff made with powdered eggs - technically an egg puff, but missing the soul.",
    tom2: "Powdered eggs! I snorted those once by accident! Very sneezy! {name}, do you make people sneeze?"
  },
  {
    blesswin1: "Dear {name}, you're more cracked than the eggs in Tom's 'experimental' concrete egg puffs.",
    tom1: "Concrete puffs! Those were for construction workers! Very filling! Nobody could finish them! {name}, are you unfinishable?",
    blesswin2: "Tom, that's because they were inedible. {name}, you're like a puff with no egg - just empty promises wrapped in pastry.",
    tom2: "Empty promises! I make those too! Like when I promise not to burn the puffs! {name}, do you make promises?"
  },
  {
    blesswin1: "{name}, I've seen more flakiness in our perfect puff pastry than reliability in your {input}.",
    tom1: "Flaky pastry! It falls apart like my life! But tastier! {name}, does your life taste good?",
    blesswin2: "Tom, your life doesn't have a taste. {name}, you're like a puff made in a microwave - quick, easy, and completely wrong.",
    tom2: "Microwave puffs! I invented those! They explode sometimes! Very exciting! {name}, do you explode?"
  },
  {
    blesswin1: "Listen {name}, your personality is more rubbery than Tom's overcooked egg puff filling.",
    tom1: "Rubber eggs! I made those! They bounced! Like egg balls! {name}, do you bounce?",
    blesswin2: "Tom, eggs shouldn't bounce. {name}, you're like a puff made with ostrich eggs - unnecessarily large and completely impractical.",
    tom2: "Ostrich eggs! I want to try those! Do ostriches make good puffs? {name}, are you an ostrich?"
  },
  {
    blesswin1: "Oh {name}, I've had more flavor explosions from our spiciest egg puffs than excitement from your {input}.",
    tom1: "Spicy puffs! I made those with ghost peppers! My tongue disappeared for three days! {name}, do you have a tongue?",
    blesswin2: "Tom, your tongue was swollen, not gone. {name}, you're like a puff made with artificial eggs - fake, processed, and disappointing.",
    tom2: "Artificial eggs! Like plastic eggs! But less colorful! {name}, are you colorful?"
  },
  {
    blesswin1: "{name}, your {input} is more deflated than our puffs when Tom forgets to preheat the oven.",
    tom1: "Cold oven puffs! They're like... sad dough pancakes! Very flat! {name}, are you flat?",
    blesswin2: "Tom, preheating is basic cooking. {name}, you're like a puff made with water instead of eggs - wet, weird, and wrong.",
    tom2: "Water puffs! I made those during the egg shortage! They were very... watery! {name}, are you watery?"
  },
  {
    blesswin1: "Dear {name}, you have less golden perfection than our signature egg puffs and more like Tom's 'creative' green puffs.",
    tom1: "Green puffs! I used spinach eggs! Or was it moldy eggs? {name}, do you like green things?",
    blesswin2: "Tom, there's no such thing as spinach eggs. {name}, you're like a puff made by someone who's never seen an egg - confused and concerning.",
    tom2: "Never seen an egg! I see eggs everywhere! In my dreams! In my soup! {name}, do you dream about eggs?"
  },
  {
    blesswin1: "{name}, I'm more impressed by Tom's ability to make square egg puffs than by your {input}.",
    tom1: "Square puffs! I used a box! Innovation! They don't roll away! {name}, do you roll away?",
    blesswin2: "Tom, that's not innovation, that's geometry gone wrong. {name}, you're like a puff made with liquid eggs - technically possible but completely cursed.",
    tom2: "Liquid egg puffs! Like egg soup in pastry! Very drippy! {name}, are you drippy?"
  }
]

export async function POST(request: NextRequest) {
  try {
    const { input } = await request.json()

    if (!input || typeof input !== 'string') {
      return NextResponse.json(
        { error: 'Input is required' },
        { status: 400 }
      )
    }

    // Simulate API delay for realism
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))

    // Extract name from input or use "friend"
    const words = input.toLowerCase().split(' ')
    let name = 'friend'
    
    // Try to find a name-like word
    const nameIndicators = ['i am', 'im', 'my name is', 'call me', 'i\'m']
    for (const indicator of nameIndicators) {
      const index = input.toLowerCase().indexOf(indicator)
      if (index !== -1) {
        const afterIndicator = input.substring(index + indicator.length).trim().split(' ')[0]
        if (afterIndicator && afterIndicator.length > 1) {
          name = afterIndicator.replace(/[^a-zA-Z]/g, '')
          break
        }
      }
    }
    
    // If no name found, try first word if it looks like a name
    if (name === 'friend' && words[0] && words[0].length > 2 && /^[a-zA-Z]+$/.test(words[0])) {
      name = words[0]
    }

    // Capitalize name
    name = name.charAt(0).toUpperCase() + name.slice(1)

    // Select random roast template
    const template = roastTemplates[Math.floor(Math.random() * roastTemplates.length)]

    // Replace placeholders
    const roast = `🥚 Blesswin: ${template.blesswin1.replace(/{name}/g, name).replace(/{input}/g, input)}

🥴 Tom: ${template.tom1.replace(/{name}/g, name).replace(/{input}/g, input)}

🥚 Blesswin: ${template.blesswin2.replace(/{name}/g, name).replace(/{input}/g, input)}

🥴 Tom: ${template.tom2.replace(/{name}/g, name).replace(/{input}/g, input)}`

    return NextResponse.json({ roast })
  } catch (error) {
    console.error('Error generating roast:', error)
    return NextResponse.json(
      { error: 'Failed to generate roast' },
      { status: 500 }
    )
  }
}
