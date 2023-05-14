const myInfo = {
  name: "Susmita Shrestha",
  address: "Kathmandu",
  emails: "susmitashrestha.dev@gmail.com",
  interests: ["Programming", "Travelling", "Dancing"],
  education: [
    {
      name: "Deep Boarding Higher Secondary School",
      enrolledDate: new Date("2016"),
    },
    {
      name: "Kathmandu University",
      enrolledDate: new Date("2018"),
    },
  ],
};

myInfo["education"].forEach((el) =>
  console.log(`Name: ${el.name}, Date: ${el.enrolledDate.getFullYear()}`)
);
