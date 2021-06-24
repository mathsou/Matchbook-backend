exports.up = function(knex) {
    return knex.schema.createTable('matches', function(table){
      table.increments('id').primary().unsigned();
      table.integer('user_id').unsigned().notNullable();
      table.integer('my_book_id').unsigned().notNullable();
      table.integer('math_book_id').unsigned().notNullable();

      table.foreign('user_id').references('user.id');
      table.foreign('my_book_id').references('book.id');
      table.foreign('math_book_id').references('book.id');

    });
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('matches');
    
  };
  