'use client'
import React, { useEffect, useRef, useState } from 'react'
import { LuMailOpen } from "react-icons/lu";
import { GiConfirmed } from "react-icons/gi";
import { MdOutlineErrorOutline } from "react-icons/md";

// mock olarak tuttuğum kod
const verificationCode = [1, 2, 3, 4, 5, 6];

function EmailVerify() {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [codeVerify, setCodeVerify] = useState(undefined);
    const [time, setTime] = useState(120);
    const inputsRef = useRef([]);

    const handleAgainRequest = () => {
        // tekrardan kod isteme işlemi
        // bu kısmda api isteği atılabilir
        setTime(120)
        setCode(["", "", "", "", "", ""])
        inputsRef.current.map((item, index) => {
            item.removeAttribute("disabled")
        })

    }

    useEffect(() => {
        let counter = 0;
        let verify = false;
        inputsRef.current.map((item, index) => {
            if (item.value == "") {
                verify = false;
                setCodeVerify(undefined)
            } else if (item.value == code[index]) {
                verify = true;
                counter++;
            }
        })
        if (verify && counter == 6 && code.join("") == verificationCode.join("")) {
            inputsRef.current.map((item, index) => {
                item.setAttribute("disabled", "disabled")
            })
            setCodeVerify(true)
            console.log("verify");
            setTimeout(() => {
                // yönlenme işlemi
                window.location.href = "/home"
            }, 1000);
        } else if (counter == 6) {
            setCodeVerify(false)
        }
    }, [code])

    useEffect(() => {
        if (time > 0) {
            const interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [time])


    return (
        <div className='flex flex-col items-center gap-3 p-3  md:p-10 rounded-lg bg-white text-black shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]'>
            <div className='w-1/3 flex items-center justify-center text-deep-slate-blue'><LuMailOpen className='size-1/2 stroke-[1px]' /></div>
            <div className='text-lg lg:text-2xl  font-semibold'>Please Verify Account</div>
            <div className='max-w-[30em] text-center'>Süre dolduğunda tekrar doğrulama kodu isteyebilirsiniz.</div>
            <div className=''>{(time / 60) < 10 ?
                "0" + Math.floor(time / 60) :
                Math.floor(time / 60)}
                :
                {(time % 60) < 10 ?
                    "0" + Math.floor(time % 60) :
                    Math.floor(time % 60)}</div>
            <div className='flex gap-2'>
                {code.map((_, index) => (
                    <input
                        key={index}
                        ref={(ref) => inputsRef.current[index] = ref}
                        type="text"
                        className='block
                         w-9 h-9 py-3 
                         text-sm 
                         font-extrabold
                          text-center
                         text-black
                         bg-white 
                         border
                         border-gray-300
                         rounded-lg 
                         focus:ring-deep-slate-blue 
                         focus:border-deep-slate-blue
                         disabled:opacity-50
                         '
                        maxLength="1"
                        value={code[index]}
                        disabled={time == 0 ? true : false}
                        onChange={(e) => {
                            // console.log(e.target.value);
                        }}
                        onKeyDown={(e) => {
                            console.log(e.key);
                            if (e.key == "Backspace") {
                                const newCode = [...code];
                                newCode[index] = "";
                                setCode(newCode);
                                if (index != 0 && code[index] == "") {
                                    inputsRef.current[index - 1].focus();
                                }
                            }
                            if (e.key.match(/^\d*$/)) {
                                const newCode = [...code];
                                newCode[index] = e.key;
                                setCode(newCode);
                                if (index !== code.length - 1) {
                                    inputsRef.current[index + 1].focus();
                                }
                            }
                        }}

                    />
                ))}
            </div>
            <div className={` items-center justify-center`}>
                <div className='bg-white text-black flex flex-col items-center justify-center text-center gap-2'>
                    {codeVerify && <GiConfirmed className='text-green-600' size={24} />}
                    {codeVerify == false && time != 0 && <MdOutlineErrorOutline className='text-red-500' size={24} />}
                    <div className='font-medium'>{codeVerify == true ? (<span>Kod doğrulandı yönlendirme gerçekleşiyor</span>) : (codeVerify != undefined && time != 0 && <span className='text-red-500'>girdiğiniz kod yanlış</span>)}</div>
                    {time == 0 && <button
                        className='text-deep-slate-blue px-4 py-2 rounded-lg text-center border border-deep-slate-blue hover:text-white hover:bg-deep-slate-blue transition-colors duration-300 ease-in-out '
                        onClick={handleAgainRequest}
                        disabled={time != 0}>Tekrar kod iste</button>}
                </div>
            </div>

        </div>
    )
}

export default EmailVerify