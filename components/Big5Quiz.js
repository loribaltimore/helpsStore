"use client"
import { useState, useContext } from 'react';
import { neuroticismQuestions, agreeablenessQuestions, extraversionQuestions, conscientiousnessQuestions, opennessQuestions } from '../util/big5';
import { RegistrationContext } from './RegistrationContext';
const traits = [neuroticismQuestions, agreeablenessQuestions, extraversionQuestions, conscientiousnessQuestions, opennessQuestions];
const traitNames = ['Neuroticism', 'Agreeableness', 'Extraversion', 'Conscientiousness', 'Openness'];
const sentiment = [
    {label: 'Agree', value: 1},
    {label: 'Disagree', value: -1},
    {label: 'Somewhat Agree', value: 0.5},
    {label: 'Somewhat Disagree', value: -0.5},
];


export default function Big5Quiz() {
    const [trait, setTrait] = useState(0);
    const [question, setQuestion] = useState(0);
    const [showButton, setShowButton] = useState(false);
    const { setEntered, setOpenness, setAgreeableness,
        setExtraversion, setConscientiousness,
        setNeuroticism, setIsPersonality } = useContext(RegistrationContext);
    return (
        <div className='w-3/4 mx-auto mt-36 space-y-10 items-center bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 rounded'>
            <div className="block ">
            <h1 className="text-black text-3xl text-left font-extralight">{traitNames[trait]}</h1>
                <h1 className="text-black text-xl text-center font-light p-5">{traits[trait][question]}</h1>
                 <div>
        <div className="mx-auto grid grid-rows-2 gap-2 grid-flow-col w-1/3">
          {sentiment.map((element, index) => (
            <div key={index} className="flex items-centero">
              <input
                      id={index + ' sentiment'}
                      name="notification-method"
                      type="radio"
                      value={element.value}
                      className="align-bottom h-4 w-4 border-black text-[#02F3B0] focus:ring-[#02F3B0]"
                      onClick={() => {
                          switch (trait) {
                              case 0: setNeuroticism(prev => prev + element.value);
                                  break;
                              case 1: setAgreeableness(prev => prev + element.value);
                                  break;
                              case 2: setExtraversion(prev => prev + element.value);
                                  break;
                              case 3: setConscientiousness(prev => prev + element.value);
                                  break;
                              case 4: setOpenness(prev => prev + element.value);
                                  break;
                              default: console.log('error');
                          }
                          if (question + 1 === 5) {
                              if (trait + 1 < 5) {
                                  setTrait(prev => prev + 1);
                                  setQuestion(0);
                              } else { setShowButton(true) };
                          } else {
                            setQuestion(prev => prev + 1);
                          };
                      }}
                  />
              <label htmlFor={index+' sentiment'} className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                      {element.label}
              </label>
            </div>
          ))}
          </div>
        </div>
            </div>
            {
                showButton ?
                    <button className='block mx-auto py-2 px-3 border border-black text-black rounded  hover:ring ring-[#02F3B0] ring-inset hover:scale-110 transition-all duration-300 ease-in-out relative block rounded border border-black p-4 active:scale-100 transition-all duration-100 ease-in-out'
                        onClick={() => { 
                            setShowButton(false);
                            setEntered('good');
                            setIsPersonality(false);
                        }}
                    >
                Submit
            </button> : null
            }
        </div>
    )
};

// complete personality Quiz, have personality polar Chart. 
// write algorithm to "calculate" compatibility on match.