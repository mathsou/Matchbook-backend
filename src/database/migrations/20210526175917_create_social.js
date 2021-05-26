exports.up = function(knex) {
    return knex.schema.createTable('social', function(table){
      table.increments('id').primary().unsigned();
      table.string('socialMedia').notNullable();
      table.string('userSocial').notNullable();
      table.integer('user_id').unsigned().notNullable();
      table.boolean('visible').notNullable();

      table.foreign('user_id').references('user.id');
    });
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('social');
    
  };
  