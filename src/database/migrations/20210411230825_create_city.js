exports.up = function(knex) {
    return knex.schema.createTable('city', function(table){
      table.increments('id').primary().unsigned();
      table.string('city').notNullable();
    });
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('city');
    
  };
  