"""Create landmark table

Revision ID: 09711a3b92f0
Revises: 2a308486176d
Create Date: 2020-10-20 22:13:00.640736

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '09711a3b92f0'
down_revision = '2a308486176d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('landmark',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('listing_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('type', sa.Enum('primary_school', 'secondary_school', 'park', 'train_station', name='landmarktype'), nullable=False),
    sa.Column('distance', sa.DECIMAL(precision=4, scale=2), nullable=False),
    sa.ForeignKeyConstraint(['listing_id'], ['listing.id'], name=op.f('fk_landmark_listing_id_listing'), ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_landmark'))
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('landmark')
    # ### end Alembic commands ###
