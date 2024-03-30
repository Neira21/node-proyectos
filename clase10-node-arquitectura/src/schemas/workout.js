const z = require('zod')

const workOutSchema = z.object({
  name: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required.'
  }),
  mode: z.string({
    invalid_type_error: 'Movie mode must be a string',
    required_error: 'Movie mode is required.'
  }),

  equipment: z.array(
    z.enum(
      ['barbell',
      'dumbbell', 
      'kettlebell', 
      'pull-up bar', 
      'jump rope', 
      'box', 
      'rings', 
      'medicine ball', 
      "rope",
      'none'])
  ),
  exercises: z.array(z.string()),
  trainerTips: z.array(z.string())
}).partial({
  exercises: true,
  trainerTips: true
})

function validateWorkout (input) {
  return workOutSchema.safeParse(input)
}
function validatePartialWorkout (input) {
  return workOutSchema.partial().safeParse(input)
}

// exportar con module.exports
 module.exports = {
  validateWorkout,
  validatePartialWorkout
}







