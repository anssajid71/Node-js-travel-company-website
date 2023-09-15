module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      Name: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.STRING,
      },

      email: {
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      retype_password: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      user_type: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.ENUM,
      },
    });

    await queryInterface.createTable('registercompanies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        refrences: {
          model: 'user',
          key: 'id',
        },
      },

      company_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      company_logo: {
        type: Sequelize.STRING,
      },
      contact_person: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      contact_email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },

      contact_phone: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropAllTables();
  },
};
