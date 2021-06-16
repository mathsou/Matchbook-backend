exports.up = function(knex) {
    return knex.schema.createTable('photos', function(table){
      table.increments('id').primary().unsigned();
      table.string('photo').notNullable();
      table.float('size').notNullable();
      table.integer('book_id').unsigned().notNullable();

      table.foreign('book_id').references('book.id');

    });
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('photos');
    
  };
  