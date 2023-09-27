async function drawScatter() {
  // * Step 1: Access data

  const dataset = await d3.csv(
    "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/iris.csv"
  )
  //console.log(dataset)
  //console.table(dataset[0])

  // *X varaible: Sepal Length
  const xAccessor = (d) => parseFloat(d.Sepal_Length)
  // console.log(xAccessor(dataset[0]))

  //*Y-variable: Petal_Length
  const yAccessor = (d) => parseFloat(d.Petal_Length)
  //console.log(yAccessor(dataset[0]))

  //*Color: Species
  const colorAccessor = (d) => d.Species
  //console.log(colorAccessor(dataset[0]))

  // *Step 2: Chart Dimensions

  //* Scatter plots are squares
  //* select smaller of: screen width or screen height
  const width = d3.min([window.innerWidth * 0.9, window.innerHeight * 0.9])

  let dimensions = {
    width: width,
    height: width,
    margin: {
      top: 10,
      right: 10,
      bottom: 50,
      left: 50,
    },
  }

  //* calculate bounds (area for the chart)
  dimensions.boundedWidth =
    dimensions.width - dimensions.margin.right - dimensions.margin.left
  dimensions.boundedHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom
  console.log(dimensions)

  //* Step 3: Draw the Canvas
  //* i) add wrapper to html element
  //* ii) add bounds

  const wrapper = d3
    .select("#wrapper")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)

  const bounds = wrapper.append("g").style(
    "transform",
    `translate(${dimensions.margin.left}px,
        ${dimensions.margin.top}px)`
  )

  //*Step 4: Create Scales

  //*x-scale
  xScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, xAccessor)) // min = 4.3 , max =7.9
    .range([0, dimensions.boundedWidth])
    .nice()
  console.log(xScale(4.3))

  //*y-scale
  yScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, yAccessor)) // min = 1, max = 6.9
    .range([dimensions.boundedHeight, 0])
    .nice()
  console.log(yScale(1))

  //*color-scale
  colorScale = d3
    .scaleOrdinal()
    .domain(["setosa", "versicolor", "virginica"])
    .range(["#F8766D", "#00BA38", "#619CFF"])
  console.log(colorScale("setosa"))

 //*Step 5: Draw Data
 const dots = bounds.selectAll("circle")
        .data(dataset)
 console.log(dots)       

dots.join("circle")
    .attr("cx", d => xScale(xAccessor(d)))
    .attr("cy", d => yScale(yAccessor(d)))
    .attr("r", 7.5)
    .attr("fill", d=> colorScale(colorAccessor(d)))

 //* Step 6: Draw Peripherals
 
 // * x-axis
 const xAxisGenerator = d3.axisBottom()
        .scale(xScale)
 
 const xAxis = bounds.append("g")
    .call(xAxisGenerator)
    .style("transform", `translateY(${dimensions.boundedHeight}px)`)       
 
 const xAxisLabel = xAxis.append("text")
        .attr("x",dimensions.boundedWidth / 2)
        .attr("y", dimensions.margin.bottom - 10)
        .attr("fill", '#D66A24')
        .style("font-size", "1.4em")
        .html("Species Length")


// * y-axis        
const yAxisGenerator = d3.axisLeft()
    .scale(yScale)     
    
 const yAxis = bounds.append("g")   
        .call(yAxisGenerator)
 
 const yAxisLabel = yAxis.append("text")
 .attr("x", -dimensions.boundedHeight / 2)
 .attr("y", -dimensions.margin.left + 10)  
 .attr("fill" ,"#D66A24")
 .style("font-size", "1.4em")
 .text("Petal Length")
 .style("transform", "rotate(-90deg)")
 .style("text-anchor", "middle")


}
drawScatter()
