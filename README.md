# Coolsim Configuration

The configuration module of includes the models used to generate the agents and community events.

To configure the simulator, the models can be changes including, e.g., new conditions, status of agents or events.

The documentation about the components of the model is included as comments in files

## Model & Configuration
The probabilistic model describes agents and communities. These characteristics can be extended or reduced using the configuration JSON for each of the characteristics.

The agent model includes six types of characteristics about its internal and external/relational characteristics. The community model concern events that can affect a given ratio of the agent population.

The configuration of each aspect of ``coolsim`` can be changed and controlled in the JSON inluded in the ``js`` file within this ``configuration`` module, like ``User/actions.js`` (User stands for Agent, it is a legacy name).

### Agent’s internal characteristics
**Profile** describes age, gender, or any relevant intrinsic characteristic of the agent. Profile characteristics can be described using a normal or uniform distribution.

Profile fields are described as follows:
-	``label``, text display name of the field
-	``type``, category of distribution in the population (uniform or normal)
-	``correction``, normalization function constraining the values within the rage. It gets in input the probability distribution and returns the value for the profile field.

Example of profile:
```
{
  label:"age",
  type:"normal",
  correction:(num)=> Math.max(0,Math.floor(num*100))
}
```
**Conditions** describes health and wellbeing events related to, e.g., conditions or diseases.

Conditions are described as follows:
-	``label``, display name of the field
-	``type``, like physical or mental that can be created as a label
-	``duration``, category of condition between temporary (can worsen or improve and be removed), chronic (can improve or worsen level but not be removed) or permanent (can only get worse).
-	``severity``, baseline impact on the type of condition
-	``rate``, number between 1 and 0, probability that an agent starts with the condition
-	``progression``, object describing the dynamic of the condition over time
o	scale, frequency of change (how often the status of the condition is revised)
o	rate, number between 1 and 0, probability that the condition severity change
o	weight, correction to the random change in the severity upon revision

Example of condition:
```
{
  label:'injury',
  type: 'physical',
  duration:'temporary',
  severity:0.4,
  rate:0.1,
  progression: {
    scale: 'day',
    rate: 0.1,
    weight: -0.1,
   }
}
```
**Status** describes a finite automaton about the evolution of the agent condition, e.g., from being active to dependent or death. Status lists the automaton states and labelled transitions: “improve” and/or “decline” to other states and the factors triggering the transition.

The automaton states are described as follows:
-	``label``, text display name of the status
-	``limit``, numeric field about max age limit (e.g., 120 years old)
-	``rate``, number between 1 and 0, probability that an agent starts in this state
-	``improve`` and ``decline`` describe the conditions of transition from a next worse or better status (inbound transitions)
    - ``from``, array of labels of status that can transition to this status
    - ``factors``, array of conditions for transition
      - ``factor``, label of the factor that can trigger the evaluation of change in condition, like age or condition
      - ``type``, category of factor like physical or mental
      - ``severity``, number from 0 to 1 describing the threshold for a transition
      - ``rate``, daily probability of transition

Example of condition:
```
{
label:'dependent',
limit:120,
rate:0.1,
      decline: {
            from:['active','independent'],
            factors: [
                {
                    factor:'condition',
                    type: 'physical',
                    severity: 0.9,
                    rate: 0.01
                },
                {
                    factor:'condition',
                    type: 'behavioural',
                    severity: 7,
                    rate: 0.005
                },
                {
                    factor:'condition',
                    type: 'mental',
                    severity: 7,
                    rate: 0.01
                },
                {
                    factor:'age',
                    type:null,
                    age: 80,
                    rate:0.5
                },
                {
                    factor:'age',
                    type:null,
                    age: 100,
                    rate:1
                }
            ]
        }
}
```
### Agent’s external / relational characteristics
The original design of the module included the definition of actions, roles, and skills of agents. The rational was that each agent could interact with each other, e.g., providing support, based on their role in the community and skills. The current version of the module supports only the simulation of agents’ actions. The agent-to-agent interaction can be simulated by using community events.

**Actions** describe what an agent can do. Actions have a duration, benefits, and risks. Each day, an agent allocates time for activities and then evaluates their impact on their status. Actions are described as follows:
-	``label``, text display name of the action
-	``type``, text category activity of daily living (self, socialization, basic, culture, health)
-	``rate``, number between 1 and 0, probability that an agent makes an action daily
-	``risks`` and  ``benefits`` are arrays of potential positive and negative effects of the action. The effect of the action changes the overall status of a condition category like health.
    - ``rate``, number between 1 and 0 representing the probability for an effect to influence the agent
    - ``weight``, number between 1 and 0 representing how much this effect can influence the agent's condition
    - ``type``, text condition category that is influenced by the effect
-	``duration``, text display name of the status
    - ``hours``, number describing the hours that the action costs
    - ``errors``, array of two numbers that describes the variance on duration, i.e., the real duration is the result of duration field +/- a random value in between the errors span.

Example of action:
```
{
  label: 'going out',
  type: 'self',
  rate: 1,
  risks: [
    { rate: 0.1, weight: 0.1, type: 'social' },
    { rate: 0.1, weight: 0.1, type: 'physical' },
    { rate: 0.1, weight: 0.1, type: 'mental' }
  ],
  benefits: [
    { rate: 0.1, weight: 0.1, type: 'social' },
    { rate: 0.1, weight: 0.1, type: 'physical' },
    { rate: 0.1, weight: 0.1, type: 'mental' }
  ],
  duration: { hours: 2, errors: [-0.3, 0.2] }
}
```
###	Community’s characteristics
The original design of the module included the definition of community locations and agent movements within and outside the community. The rational was that each agent could interact with each other within specific locations and that locations can bring benefits and can bring new conditions or other effects from other communities. The current version of the module supports only the simulation of community events. The agent-to-agent interactions in locations, and exogenous effects can be simulated by using events.

**Event** describe happening in the community that can modify the condition of agents, i.e., external factors influencing their evolution regardless of their actions and internal status. Events can be either negative or positive, like seasonal flu or socialization events.

An event is described as follows:
-	``label``, text display name of the event
-	``starting``, number between 0 and 1 describing the probability of an event to be triggered daily
-	``spreading``, number between 0 and 1 describing the probability that an agent is involved in the event when the event is ongoing daily
-	``ending``, number between 0 and 1 describing the probability that an ongoing event ends daily
-	``effects``, array of conditions or actions that the event imposes to affected agents
    - ``label``, text display name of the effect described in a list of conditions or actions
    - ``source``, text category of the list where the effect is described (condition or action)
    - ``rate``, number between 0 and 1 describing the probability that the agent involved in the event will experience this effect.

Example of a positive event:
```
{
  label: 'food festival',
  starting: 1,
  spreading: 0.3,
  ending: 0.1,
  effects: [
    {label: 'eat', source: 'action', rate: 0.3},
    {label: 'visit', source: 'action', rate: 1},
    {label: 'entertainment', source: 'action', rate: 1}
  ]
}
```
