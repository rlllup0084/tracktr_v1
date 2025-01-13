export const fetchVinData = async (vin: string) => {
  // In a real-world scenario, you would make an API call here
  // For this example, we'll simulate an API call with a timeout
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // This is a mock response based on the provided JSON
  return {
    make: 'Lamborghini',
    model: 'Urus',
    year: 2019,
    engine: '4.0L V8 Twin-Turbo',
    transmission: '8-Speed Automatic',
    drivenWheels: 'All Wheel Drive',
    exteriorColor: 'Nero Noctis',
    interiorColor: 'Nero Ade Unicolor Leather',
    mpg: {
      city: 12,
      highway: 17,
    },
  };
};
