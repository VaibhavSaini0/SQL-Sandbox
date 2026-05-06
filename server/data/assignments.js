const assignments = [
  {
    id: "1",
    title: "Select All Employees",
    description:
      "Write a query to retrieve all columns from the employees table.",
    difficulty: "easy",
    category: "SELECT",

    tables: [
      {
        name: "employees",
        columns: [
          { name: "id", type: "INT" },
          { name: "name", type: "VARCHAR(100)" },
          { name: "department", type: "VARCHAR(50)" },
          { name: "salary", type: "DECIMAL(10,2)" },
          { name: "hire_date", type: "DATE" },
        ],
        sampleData: [
          { id: 1, name: "Alice Johnson", department: "Engineering", salary: 85000, hire_date: "2021-03-15" },
          { id: 2, name: "Bob Smith", department: "Marketing", salary: 65000, hire_date: "2020-07-22" },
          { id: 3, name: "Carol Williams", department: "Engineering", salary: 92000, hire_date: "2019-11-01" },
          { id: 4, name: "David Brown", department: "HR", salary: 58000, hire_date: "2022-01-10" },
          { id: 5, name: "Eva Martinez", department: "Marketing", salary: 71000, hire_date: "2021-09-05" },
        ],
      },
    ],

    expectedColumns: ["id","name","department","salary","hire_date"],

    expectedResult: [
      { id:1,name:"Alice Johnson",department:"Engineering",salary:85000,hire_date:"2021-03-15"},
      { id:2,name:"Bob Smith",department:"Marketing",salary:65000,hire_date:"2020-07-22"},
      { id:3,name:"Carol Williams",department:"Engineering",salary:92000,hire_date:"2019-11-01"},
      { id:4,name:"David Brown",department:"HR",salary:58000,hire_date:"2022-01-10"},
      { id:5,name:"Eva Martinez",department:"Marketing",salary:71000,hire_date:"2021-09-05"}
    ]
  },

  {
    id: "2",
    title: "Filter by Department",
    description:
      "Find all employees in Engineering department. Return name and salary.",
    difficulty: "easy",
    category: "WHERE",

    tables: [
      {
        name: "employees",
        columns: [
          { name: "id", type: "INT" },
          { name: "name", type: "VARCHAR(100)" },
          { name: "department", type: "VARCHAR(50)" },
          { name: "salary", type: "DECIMAL(10,2)" },
          { name: "hire_date", type: "DATE" },
        ],
        sampleData: [
          { id: 1, name: "Alice Johnson", department: "Engineering", salary: 85000, hire_date: "2021-03-15" },
          { id: 2, name: "Bob Smith", department: "Marketing", salary: 65000, hire_date: "2020-07-22" },
          { id: 3, name: "Carol Williams", department: "Engineering", salary: 92000, hire_date: "2019-11-01" },
          { id: 4, name: "David Brown", department: "HR", salary: 58000, hire_date: "2022-01-10" },
          { id: 5, name: "Eva Martinez", department: "Marketing", salary: 71000, hire_date: "2021-09-05" },
        ],
      },
    ],

    expectedColumns:["name","salary"],

    expectedResult:[
      { name:"Alice Johnson",salary:85000 },
      { name:"Carol Williams",salary:92000 }
    ]
  },

  {
    id:"3",
    title:"Average Salary by Department",
    description:"Calculate average salary per department",
    difficulty:"medium",
    category:"GROUP BY",

    tables:[
      {
        name:"employees",
        columns:[
          { name:"id",type:"INT"},
          { name:"name",type:"VARCHAR(100)"},
          { name:"department",type:"VARCHAR(50)"},
          { name:"salary",type:"DECIMAL(10,2)"},
          { name:"hire_date",type:"DATE"},
        ],
        sampleData:[
          { id:1,name:"Alice Johnson",department:"Engineering",salary:85000,hire_date:"2021-03-15"},
          { id:2,name:"Bob Smith",department:"Marketing",salary:65000,hire_date:"2020-07-22"},
          { id:3,name:"Carol Williams",department:"Engineering",salary:92000,hire_date:"2019-11-01"},
          { id:4,name:"David Brown",department:"HR",salary:58000,hire_date:"2022-01-10"},
          { id:5,name:"Eva Martinez",department:"Marketing",salary:71000,hire_date:"2021-09-05"}
        ]
      }
    ],

    expectedColumns:["department","avg_salary"],

    expectedResult:[
      { department:"Engineering",avg_salary:88500 },
      { department:"Marketing",avg_salary:68000 },
      { department:"HR",avg_salary:58000 }
    ]
  },

  {
    id:"4",
    title:"Join Orders with Customers",
    description:"Join orders and customers tables",
    difficulty:"medium",
    category:"JOIN",

    tables:[
      {
        name:"customers",
        columns:[
          { name:"id",type:"INT"},
          { name:"customer_name",type:"VARCHAR(100)"},
          { name:"email",type:"VARCHAR(100)"},
          { name:"city",type:"VARCHAR(50)"}
        ],
        sampleData:[
          { id:1,customer_name:"TechCorp",email:"info@techcorp.com",city:"San Francisco"},
          { id:2,customer_name:"DataInc",email:"hello@datainc.com",city:"New York"},
          { id:3,customer_name:"WebFlow",email:"contact@webflow.io",city:"Austin"}
        ]
      },

      {
        name:"orders",
        columns:[
          { name:"order_id",type:"INT"},
          { name:"customer_id",type:"INT"},
          { name:"product",type:"VARCHAR(100)"},
          { name:"amount",type:"DECIMAL(10,2)"},
          { name:"order_date",type:"DATE"}
        ],
        sampleData:[
          { order_id:101,customer_id:1,product:"Cloud Hosting",amount:2500,order_date:"2024-01-15"},
          { order_id:102,customer_id:2,product:"Data Analytics",amount:4800,order_date:"2024-02-20"},
          { order_id:103,customer_id:1,product:"API Gateway",amount:1200,order_date:"2024-03-10"},
          { order_id:104,customer_id:3,product:"Web Builder",amount:3500,order_date:"2024-03-22"}
        ]
      }
    ],

    expectedColumns:["order_id","customer_name","product","amount"],

    expectedResult:[
      { order_id:101,customer_name:"TechCorp",product:"Cloud Hosting",amount:2500},
      { order_id:102,customer_name:"DataInc",product:"Data Analytics",amount:4800},
      { order_id:103,customer_name:"TechCorp",product:"API Gateway",amount:1200},
      { order_id:104,customer_name:"WebFlow",product:"Web Builder",amount:3500}
    ]
  }

];

module.exports = { assignments };