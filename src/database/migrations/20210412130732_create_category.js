exports.up = function(knex) {
    return knex.schema.createTable('category', function(table){
      table.increments('id').primary().unsigned();
      table.string('description').notNullable();
    });
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('category');
    
  };
  