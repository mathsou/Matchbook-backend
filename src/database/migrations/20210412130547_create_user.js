exports.up = function(knex) {
    return knex.schema.createTable('user', function(table){
      table.increments('id').primary().unsigned();
      table.string('userName').notNullable();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.string('password').notNullable();
      table.integer('city_id').unsigned();

      table.foreign('city_id').references('city.id');
    });
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('user');
    
  };
  