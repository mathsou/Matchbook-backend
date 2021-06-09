exports.up = function(knex) {
    return knex.schema.createTable('likes', function(table){
      table.increments('id').primary().unsigned();
      table.boolean('liked').notNullable();
      table.integer('book_id').unsigned().notNullable();
      table.integer('user_id').unsigned().notNullable();

      table.foreign('book_id').references('book.id').onDelete('CASCADE').onUpdate('CASCADE');
      table.foreign('user_id').references('user.id').onDelete('CASCADE').onUpdate('CASCADE');
    });
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('likes');
    
  };
  