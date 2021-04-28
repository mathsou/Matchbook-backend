exports.up = function(knex) {
    return knex.schema.createTable('book', function(table){
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('author').notNullable();
      table.integer('user_id').unsigned().notNullable();
      table.integer('category_id').unsigned().notNullable();

      table.foreign('user_id').references('user.id').onDelete('CASCADE').onUpdate('CASCADE');
      table.foreign('category_id').references('category.id').onDelete('CASCADE').onUpdate('CASCADE');
    });
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('book');
    
  };
  