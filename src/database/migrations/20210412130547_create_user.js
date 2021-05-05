exports.up = function(knex) {
    return knex.schema.createTable('user', function(table){
      table.increments('id').primary().unsigned();
      table.string('userName').notNullable();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.string('password').notNullable();
      table.string('city_id').notNullable();
      table.string('facebook');
      table.string('instagram');
      table.boolean('showFacebook').notNullable();
      table.boolean('showInstagram').notNullable();
      table.boolean('showEmail').notNullable();

      table.foreign('city_id').references('city.id').onDelete('CASCADE').onUpdate('CASCADE');
    });
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('user');
    
  };
  