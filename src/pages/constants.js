export const mockCrimes = [
    {
      crime_id: 1,
      description: "Bank robbery at Main Street branch",
      severity_level: "High",
      type: "Robbery",
      status: "Open",
      officers: [
        { officer_id: 1, name: "John Smith" }
      ],
      victims: [
        { victim_id: 1, name: "Bank Corp", age: null, gender: null }
      ],
      suspects: [
        { suspect_id: 1, name: "James Wilson", age: 32, gender: "Male" }
      ]
    },
    {
      crime_id: 2,
      description: "Vandalism in Central Park",
      severity_level: "Medium",
      type: "Vandalism",
      status: "Closed",
      officers: [
        { officer_id: 2, name: "Sarah Johnson" }
      ],
      victims: [
        { victim_id: 2, name: "City Parks Dept", age: null, gender: null }
      ],
      suspects: [
        { suspect_id: 2, name: "Mike Brown", age: 19, gender: "Male" },
        { suspect_id: 3, name: "Alex Green", age: 20, gender: "Female" }
      ]
    }
  ];