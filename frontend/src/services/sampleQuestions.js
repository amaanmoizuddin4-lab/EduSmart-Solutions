// Sample homework questions for testing
export const sampleQuestions = [
  {
    id: 1,
    subject: 'Mathematics',
    topic: 'Quadratic Equations',
    question: 'How do I solve the quadratic equation x² + 5x + 6 = 0?',
    answer: `To solve the quadratic equation x² + 5x + 6 = 0, we can use factoring:

Step 1: Identify the form ax² + bx + c = 0
Here: a=1, b=5, c=6

Step 2: Find two numbers that multiply to c(6) and add to b(5)
The numbers are 2 and 3 (since 2×3=6 and 2+3=5)

Step 3: Factor the equation
(x + 2)(x + 3) = 0

Step 4: Solve for x
x + 2 = 0  →  x = -2
x + 3 = 0  →  x = -3

Answer: x = -2 or x = -3

You can verify: 
- For x = -2: (-2)² + 5(-2) + 6 = 4 - 10 + 6 = 0 ✓
- For x = -3: (-3)² + 5(-3) + 6 = 9 - 15 + 6 = 0 ✓`
  },
  {
    id: 2,
    subject: 'Science',
    topic: 'Photosynthesis',
    question: 'What is photosynthesis and why is it important for life on Earth?',
    answer: `Photosynthesis is the process by which plants use sunlight to convert carbon dioxide and water into glucose (sugar) and oxygen.

The Equation:
6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂

Two Main Stages:

1. Light-Dependent Reactions (in thylakoid membranes):
   - Chlorophyll absorbs light energy
   - Water molecules are split (photolysis)
   - Produces: ATP, NADPH, and oxygen

2. Light-Independent Reactions/Calvin Cycle (in stroma):
   - Uses ATP and NADPH from light reactions
   - Converts CO₂ into glucose
   - Occurs in the dark (doesn't need light directly)

Why It's Important:

1. Oxygen Production: Releases oxygen that animals breathe
2. Food Production: Creates glucose for plant growth
3. Energy Transfer: Transfers solar energy into chemical energy
4. Carbon Cycle: Removes CO₂ from atmosphere
5. Foundation of Food Chain: Plants are primary producers

Without photosynthesis, there would be no oxygen, no food for animals, and life on Earth couldn't exist!`
  },
  {
    id: 3,
    subject: 'English',
    topic: 'Literary Devices',
    question: 'What is the difference between a simile and a metaphor? Give examples.',
    answer: `Similes and metaphors are both comparisons, but they work differently:

SIMILE:
- Compares two different things using "like" or "as"
- Makes an explicit comparison
- Example: "Her smile was like sunshine"
- Example: "He runs as fast as a cheetah"
- The comparison is obvious and stated directly

METAPHOR:
- Compares two different things WITHOUT using "like" or "as"
- Makes an implicit comparison (suggests rather than states)
- Example: "Her smile was sunshine" (sunshine = happiness, warmth)
- Example: "The world is a stage" (life = theater performance)
- The comparison is implied and more poetic

Key Difference:
- Simile says: A IS LIKE B
- Metaphor says: A IS B

Why Use Them?

Similes: Help readers understand by making clear comparisons
Metaphor: Creates deeper meaning and poetic effect

Example Poem with Both:
"Her hair was like golden wheat (simile)
She was a warrior of words (metaphor)
Her eyes were burning fire (metaphor - not "like fire")"

Remember: If you see "like" or "as" → SIMILE
If you don't → likely a METAPHOR`
  },
  {
    id: 4,
    subject: 'Physics',
    topic: 'Newton Laws of Motion',
    question: 'Explain Newton\'s First Law of Motion with a real-world example.',
    answer: `Newton's First Law of Motion states:
"An object in motion stays in motion, and an object at rest stays at rest, unless acted upon by an external force."

This is also called the Law of Inertia.

What It Means:

1. If something is NOT moving, it won't start moving by itself
2. If something IS moving, it won't stop or change direction by itself
3. Both require a FORCE to change

Real-World Examples:

Example 1: Car Stopping
- You're driving at 60 km/h
- Suddenly, you hit the brakes
- Your body continues moving forward (inertia)
- You need a seatbelt (friction force) to stop you
- Without the seatbelt, inertia keeps you moving

Example 2: Sliding on Ice
- A hockey puck slides on ice
- There's very little friction
- The puck keeps sliding far away
- "Ice" = less force opposing motion
- More force needed to stop it

Example 3: Spinning Coin
- Spin a coin on a table
- It keeps spinning (inertia)
- Friction gradually slows it down (external force)
- Eventually it stops

Why Is It Important?

- Explains why seatbelts save lives
- Explains why vehicles have brakes and steering
- Shows relationship between force and motion
- Foundation for understanding all motion

Formula Connection:
F = ma (Force = mass × acceleration)
- If F = 0, then a = 0 (no acceleration = constant velocity or at rest)`
  },
  {
    id: 5,
    subject: 'History',
    topic: 'French Revolution',
    question: 'What were the main causes of the French Revolution?',
    answer: `The French Revolution (1789-1799) had several major causes:

1. FINANCIAL CRISIS
- France spent heavily on wars (American Revolution, etc.)
- Excessive spending by King Louis XVI
- Tax system was unfair - poor paid taxes, nobility didn't
- National debt became huge
- Government nearly bankrupt

2. SOCIAL INEQUALITY (The Three Estates)
- First Estate: Clergy (1%) - privileged, no taxes
- Second Estate: Nobility (2%) - privileged, no taxes
- Third Estate: Common people (97%) - paid ALL taxes
- System was unjust and caused resentment

3. ENLIGHTENMENT IDEAS
- Philosophers like Voltaire and Rousseau promoted ideas about:
  - Individual rights
  - Democracy
  - Freedom of thought
- People questioned absolute monarchy
- Influenced people to demand change

4. POOR HARVESTS & FAMINE
- Bad crops in 1788-1789
- Food prices increased dramatically
- People were starving
- Government couldn't help
- Led to anger and protests

5. ABSOLUTE MONARCHY
- King Louis XVI had absolute power
- People had no say in government
- No parliament or democracy
- Decisions affected people without their input
- This caused frustration

6. RISE OF MIDDLE CLASS
- Merchants and professionals (Third Estate) grew wealthier
- But had no political power
- Resentment about lack of influence
- Demanded representation

The Spark:
- King called Estates-General meeting
- Third Estate demanded more power
- This led to storming of Bastille (July 14, 1789)
- Revolution officially began

Result:
- End of absolute monarchy
- Declaration of the Rights of Man
- New government system
- Modern democracy in France`
  }
];

export default sampleQuestions;
