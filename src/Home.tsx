import React, { useState } from "react";
import "./Calculator.css";
import backspace from "./img/backspace.svg";

let score: number | undefined;
let element: string;
let symbol: string;
let isNum: number | undefined;

const Calculator: React.FC = () => {
    const Btn = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "–",
        "+",
        ".",
        "/",
        "x",
        "=",
        "C",
    ];
    const arrNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [value, setValue] = useState<number | string>("");
    const click = (e: React.MouseEvent) => {
        const checkKey = () => {
            //проверка на нажатие числа от 0 до 9
            element = e.currentTarget.innerHTML;
            for (let index = 0; index < arrNumber.length; index++) {
                if (element === String(arrNumber[index])) {
                    isNum = Number(element);
                    isNum !== undefined && isNum >= 0 && isNum <= 9
                        ? value === ""
                            ? setValue(isNum)
                            : setValue(value + String(isNum))
                        : console.log(); //проверяет наличие предыдущих знаков в input и складывает их если имеются преобразуя isNum в string
                    return;
                }
            }
            if (element === ".") {
                value !== ""
                    ? setValue(value + String(element))
                    : console.error();
            }
            switch (element) {
                case "+":
                    symbol = "+";
                    addScore();
                    break;
                case "–":
                    symbol = "–";
                    addScore();
                    break;
                case "x":
                    symbol = "x";
                    addScore();
                    break;
                case "/":
                    symbol = "/";
                    addScore();
                    break;
                case "=":
                    if (score !== undefined) {
                        if (symbol === "+") {
                            setValue(score + Number(value));
                            score = undefined;
                        } else if (symbol === "–") {
                            setValue(score - Number(value));
                            score = undefined;
                        } else if (symbol === "x") {
                            setValue(score * Number(value));
                            score = undefined;
                        } else if (symbol === "/") {
                            setValue(score / Number(value));
                            score = undefined;
                        }
                    }
                    break;
                case "C":
                    setValue("");
                    score = undefined;
                    break;
                case ".":
                    break;
            }
        };

        const addScore = () => {
            if (typeof score === "undefined") {
                score = Number(value);
                setValue("");
            } else if (element === "+") {
                summation();
            } else if (element === "–") {
                subtraction();
            } else if (element === "x") {
                multiplication();
            } else if (element === "/") {
                division();
            }
        };
        const summation = () => {
            if (score !== undefined) {
                score = score + Number(value);
                setValue("");
                errScore();
            }
        };
        const subtraction = () => {
            if (score !== undefined) {
                score = score - Number(value);
                setValue("");
                errScore();
            }
        };
        const multiplication = () => {
            if (score !== undefined) {
                score = score * Number(value);
                setValue("");
                errScore();
            }
        };
        const division = () => {
            if (score !== undefined) {
                score = score / Number(value);
                setValue("");
                errScore();
            }
        };
        const errScore = () => {
            if (isNaN(Number(score)) === true) {
                score = undefined;
                setValue("Error");
            }
        };
        checkKey();
    };
    const del = () => {
        if (value !== undefined) {
            let result = String(value).slice(0, String(value).length - 1);
            setValue(result);
        }
    };
    return (
        <div className="calculator">
            <div className="calculator__input input">
                <input
                    value={value}
                    readOnly={true}
                    className="input__primary"
                    id="input"
                />
                <>
                    {score !== undefined ? (
                        <input
                            value={score}
                            readOnly={true}
                            className="input__score"
                            id="score"
                        />
                    ) : (
                        console.log()
                    )}
                </>
            </div>
            <button
                className="calculator__backspace"
                id="backspace"
                onClick={() => del()}
            >
                <img src={backspace} alt="backspace" draggable="false" />
            </button>
            <div className="calculator__numpad numpad">
                {Btn.map((obj, i) => (
                    <div
                        className="numpad__btn"
                        id={`btn${i}`}
                        data-inner={obj}
                        key={i}
                        onClick={(e) => click(e)}
                    >
                        {obj}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calculator;
