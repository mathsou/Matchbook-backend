exports.up = function(knex) {
    return knex.schema.createTable('book', function(table){
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('author').notNullable();
      table.string('user_id').notNullable();
      table.string('category_id').notNullable();
    });
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('book');
    
  };
  