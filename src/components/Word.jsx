import React from 'react'
import {useEffect, useRef} from 'react';
import Meaning from './Meaning';
import iconPlay from '../assets/icon-play.svg';
import newWindow from '../assets/icon-new-window.svg';




function Word({data}) {
        
    const phonics = data.phonetics?.find(phonetics => phonetics.text && phonetics.audio)
    const meanings = data.meanings.map((meaning, index) => <Meaning key={index} meaning={meaning}/>)
    const audioRef = useRef(null)

    useEffect(() =>{
        audioRef.current = new Audio(phonics?.audio)
    }, [data])

    function audioPlay() {
        audioRef.current.play()
    }

    console.log(phonics)





  return (
    <main className="mt-10 mb-[5.25rem] tablet:mt-11 tablet:mb-[7.75rem]">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-mobile-heading-l tablet:text-heading-l tablet:leading-heading-l font-bold tablet:mb-2">
                    {data.word}
                    </h1>
                <p className="text-purple text-body-m leading-body-m tablet:text-heading-m tablet:leading-heading-m">{phonics?.text}</p>
            </div>

            {phonics?.audio && (
                <button aria-label="play" onClick={audioPlay}>
                    <img className="w-[48px] tablet:w-[75px]" src={iconPlay} alt="play-icon"/>
                </button>
            )}
        </div>
        {meanings}
        <div className="mt-8 tablet:mt-[2.375rem] pt-6 tablet:pt-[1.125rem] border-t-1 border-t-[1px] border-t-gray-2 dark:border-t-black-4 text-body-s leading-body-s tablet:flex items-center">
            <div className="text-gray mb-2 underline tablet:mr-5 tablet:mb-0">
                Source
            </div>
            <div className="flex">
                <a className="underline mr-2" href={data.sourceUrls[0]} target="_blank">{data.sourceUrls[0]}</a>
                <img src={newWindow} alt="external link"/>
            </div>
        </div>
    </main>




    
  )
}

export default Word