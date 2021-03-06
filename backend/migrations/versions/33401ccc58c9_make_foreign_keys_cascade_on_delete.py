"""Make foreign keys cascade on delete

Revision ID: 33401ccc58c9
Revises: 4cf51c5ea322
Create Date: 2020-10-17 09:58:21.914842

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '33401ccc58c9'
down_revision = '4cf51c5ea322'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(op.f('fk_listing_owner_id_user'), 'listing', type_='foreignkey')
    op.create_foreign_key(op.f('fk_listing_owner_id_user'), 'listing', 'user', ['owner_id'], ['id'], ondelete='CASCADE')
    op.drop_constraint(op.f('fk_registration_user_id_user'), 'registration', type_='foreignkey')
    op.drop_constraint(op.f('fk_registration_listing_id_listing'), 'registration', type_='foreignkey')
    op.create_foreign_key(op.f('fk_registration_listing_id_listing'), 'registration', 'listing', ['listing_id'], ['id'], ondelete='CASCADE')
    op.create_foreign_key(op.f('fk_registration_user_id_user'), 'registration', 'user', ['user_id'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(op.f('fk_registration_user_id_user'), 'registration', type_='foreignkey')
    op.drop_constraint(op.f('fk_registration_listing_id_listing'), 'registration', type_='foreignkey')
    op.create_foreign_key(op.f('fk_registration_listing_id_listing'), 'registration', 'listing', ['listing_id'], ['id'])
    op.create_foreign_key(op.f('fk_registration_user_id_user'), 'registration', 'user', ['user_id'], ['id'])
    op.drop_constraint(op.f('fk_listing_owner_id_user'), 'listing', type_='foreignkey')
    op.create_foreign_key(op.f('fk_listing_owner_id_user'), 'listing', 'user', ['owner_id'], ['id'])
    # ### end Alembic commands ###
