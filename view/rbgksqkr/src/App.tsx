import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { lineData } from "./sampleData";

function App() {
    const ref = useRef<HTMLDivElement>(null);
    const width = 300;
    const height = 300;
    const [values, setValues] = useState(lineData);

    const removeSvg = () => {
        d3.select(ref.current).call((g) => g.select("circle").remove());
    };

    useEffect(() => {
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        const currentElement = ref.current;
        const svg = d3.select(currentElement);

        const parseDate: any = d3.timeParse("%Y-%m-%d");
        const data = values.map(({ d, v }) => ({
            d: parseDate(d),
            v,
        }));

        const xDomain = d3.extent(data, (data) => data.d) as [number, number];
        const x = d3
            .scaleUtc()
            .domain(xDomain)
            .range([margin.left, width - margin.right]);

        const yMax = d3.max(data, (data) => data.v) as number;
        const y = d3
            .scaleLinear()
            .domain([0, yMax])
            .nice()
            .range([height - margin.bottom, margin.top]);
    }, [values]);

    return (
        <>
            <h1> Line Chart </h1>
            <button onClick={removeSvg}>지우기</button>
            <div
                className="container"
                style={{ width: width, height: height }}
                ref={ref}
            ></div>
        </>
    );
}

export default App;
