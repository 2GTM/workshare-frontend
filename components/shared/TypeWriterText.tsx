'use client';

import TypewriterComponent from "typewriter-effect";

export default function TextTypeWriter(props : any) {
    return (
        <TypewriterComponent
            options={
                {
                    strings: props.text.split(" "),
                    autoStart: true,
                    loop: true
                }
            }
        />
    )
}